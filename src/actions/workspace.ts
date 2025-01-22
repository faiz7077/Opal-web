"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { sendEmail } from "./user";

export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        message: "Unauthorized ! User not found",
      };
    }

    const isUserInWorkspace = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkid: user.id,
            },
          },
          {
            members: {
              every: {
                User: {
                  clerkid: user.id,
                },
              },
            },
          },
        ],
      },
    });
    if (isUserInWorkspace)
      return {
        status: 200,
        data: { workspace: isUserInWorkspace },
      };
    return {
      status: 403,
      data: { workspace: null },
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
      error,
    };
  }
};

export const getWorkSpaces = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        message: "Unauthorized !! User not found",
      };
    }

    const workspaces = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (workspaces) {
      return {
        status: 200,
        data: workspaces,
      };
    }
    return {
      status: 400,
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
      error,
    };
  }
};

export const getWorkspaceFolders = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        message: "Unauthorized!, User not found",
      };
    }
    const isFolders = await client.folder.findMany({
      where: {
        workSpaceId: workspaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (isFolders && isFolders.length > 0) {
      return {
        status: 200,
        data: isFolders,
      };
    }
    return {
      status: 404,
      data: [],
    };
  } catch (error) {
    return {
      status: 403,
      data: [],
    };
  }
};

export const getAllUserVideos = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        message: "Unauthorized !, user not found",
      };
    }

    const vidoes = await client.video.findMany({
      where: {
        OR: [{ workSpaceId: workspaceId }, { folderId: workspaceId }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (vidoes && vidoes.length) {
      return {
        status: 200,
        data: vidoes,
      };
    }
    return {
      status: 404,
      data: [],
    };
  } catch (error) {
    return {
      status: 400,
      data: [],
      error,
    };
  }
};

export const CreateWorkspace = async (name: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        message: "Unauthorized!!, No user found",
      };
    }
    const authorized = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (authorized?.subscription?.plan === "PRO") {
      const workspace = await client.user.update({
        where: {
          clerkid: user.id,
        },
        data: {
          workspace: {
            create: {
              name,
              type: "PUBLIC",
            },
          },
        },
      });
      if (workspace) {
        return { status: 201, data: "Workspace Created !!" };
      }
    }
    return {
      status: 401,
      data: "You are not authorized to create a workspace.",
    };
  } catch (error) {
    return {
      status: 500,
      error,
    };
  }
};

export const createFolder = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        message: "Unauthorized!!, no user found",
      };
    }

    const isNewFolder = await client.workSpace.update({
      where: {
        id: workspaceId,
      },
      data: {
        folders: {
          create: { name: "Untitled" },
        },
      },
    });
    if (isNewFolder) {
      return { status: 200, message: "New Folder Created" };
    }
    return {
      status: 401,
      message: "something went wrong",
    };
  } catch (error) {
    return { status: 500, message: "Oops something went wrong" };
  }
};

export const renameFolders = async (folderId: string, name: string) => {
  try {
    const folder = await client.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name,
      },
    });

    if (folder) {
      return {
        status: 200,
        data: "Folder Renamed",
      };
    }
    return {
      status: 400,
      data: "Folder does not exist",
    };
  } catch (error) {
    return {
      status: 500,
      data: "Oops! something went wrong",
    };
  }
};

export const getFolderInfo = async (folderId: string) => {
  try {
    const folder = await client.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        name: true,
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (folder) {
      return {
        status: 200,
        data: folder,
      };
    }
    return {
      status: 400,
      data: "Folder does not exist",
    };
  } catch (error) {
    return {
      status: 500,
      data: "Oops! something went wrong",
      error,
    };
  }
};

export const moveVideoLocation = async (
  videoId: string,
  workSpaceId: string,
  folderId: string
) => {
  try {
    const location = await client.video.update({
      where: {
        id: videoId,
      },
      data: {
        folderId: folderId || null,
        workSpaceId,
      },
    });

    if (location) return { status: 200, data: "Folder changed successfully" };
    return { status: 404, data: "workspace/folder not found" };
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" };
  }
};

export const getPreviewVideo = async (videoId: string) => {
  try {
    const user = await currentUser();
    // if (!user) return {
    //     status: 404,
    //     data: "Unauthorized! no user found"
    // }
    const video = await client.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        title: true,
        createdAt: true,
        source: true,
        description: true,
        processing: true,
        views: true,
        summery: true,
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
            clerkid: true,
            trial: true,
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
      },
    });

    if (video) {
      return {
        status: 200,
        data: video,
        author: user && user.id === video.User?.clerkid ? true : false,
      };
    }
    return {
      status: 404,
      data: "Video not found",
    };
  } catch (error) {
    return {
      status: 500,
      data: "Something went wrong",
      error,
    };
  }
};

export const sendemailForFirstView = async (videoId: string) => {
  try {
    const user = await currentUser();
    if (!user)
      return {
        status: 403,
      };
    const firstViewSettings = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        firstView: true,
      },
    });

    if (!firstViewSettings?.firstView) return;

    const video = await client.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        title: true,
        views: true,
        User: {
          select: {
            email: true,
          },
        },
      },
    });

    if (video && video.views === 0) {
      await client.video.update({
        where: {
          id: videoId,
        },
        data: {
          views: video.views + 1,
        },
      });

      const { transporter, mailOptions } = await sendEmail(
        video.User?.email!,
        "You got a viewer",
        `Your video ${video.title} just got its first viewer`
      );

      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.log(error.message);
        } else {
          const notification = await client.user.update({
            where: { clerkid: user.id },
            data: {
              notification: {
                create: {
                  content: mailOptions.text,
                },
              },
            },
          });
          if (notification) {
            return { status: 200 };
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const editVideoInfo = async (
  videoId: string,
  title: string,
  description: string
) => {
  try {
    const video = await client.video.update({
      where: { id: videoId },
      data: {
        title,
        description,
      },
    });
    if (video) return { status: 200, data: "Video successfully updated" };
    return { status: 404, data: "Video not found" };
  } catch (error) {
    return { status: 400 };
  }
};
