"use server"

import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import nodemailer from "nodemailer"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET as string)

export const sendEmail = async (
    to: string,
    subject: string,
    text: string,
    html?: string
) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_PASSWORD,
        },
    })

    const mailOptions = {
        to,
        subject,
        text,
        html,
    }
    return { transporter, mailOptions }
}

export const onAuthenticateUser = async () => {
    try {
        const user = await currentUser()
        if (!user) {
            return { status: 403, message: "Unauthorized: No user found" }
        }

        const userExist = await client.user.findUnique({
            where: {
                clerkid: user.id,
            },
            include: {
                workspace: {
                    where: {
                        User: {
                            clerkid: user.id
                        },
                    },
                },
            },
        })
        if (userExist) {
            return {
                status: 200,
                user: userExist
            }
        }
        const newUser = await client.user.create({
            data: {
                clerkid: user.id,
                email: user.emailAddresses[0].emailAddress,
                firstname: user.firstName,
                lastname: user.lastName,
                image: user.imageUrl,
                studio: {
                    create: {},
                },
                subscription: {
                    create: {},
                },
                workspace: {
                    create: {
                        name: `${user.firstName}'s Workspace`,
                        type: "PERSONAL",
                    },
                },
            },
            include: {
                workspace: {
                    where: {
                        User: {
                            clerkid: user.id,
                        },
                    },
                },
                subscription: {
                    select: {
                        plan: true,
                    },
                },
            },
        })
        if (newUser) {
            return {
                status: 201,
                user: newUser
            }
        }
        return {
            status: 400,
            message: "User creation failed",
        }
    } catch (error: any) {
        return {
            status: 500,
            message: "Internal server error",
            error: error?.message || "Internal Server Error",
        }
    }
}

export const getNotifications = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            return {
                status: 403,
                message: "Unauthorized !, User not found",
            }
        }

        const notifications = await client.user.findUnique({
            where: {
                clerkid: user.id,
            },
            select: {
                notification: true,
                _count: {
                    select: {
                        notification: true,
                    }
                }
            },
        })

        if (notifications && notifications.notification.length) {
            return {
                status: 200,
                data: notifications,
            }
        }
        return {
            status: 404,
            data: []
        }
    } catch (error) {
        return {
            status: 500,
            data: [],
            error,
        }
    }
}

export const searchUsers = async (query: string) => {
    try {
        const user = await currentUser()
        if (!user) {
            return {
                status: 403,
                message: "Unauthorized ! User not found"
            }
        }

        const users = await client.user.findMany({
            where: {
                OR: [
                    { firstname: { contains: query } },
                    { email: { contains: query } },
                    { lastname: { contains: query } }
                ],
                NOT: [{ clerkid: user.id }],
            },
            select: {
                id: true,
                subscription: {
                    select: {
                        plan: true,
                    },
                },
                firstname: true,
                lastname: true,
                image: true,
                email: true,
            },
        })

        if (users && users.length > 0) {
            return { status: 200, data: users }
        }

        return { status: 404, data: undefined }
    } catch (error) {
        return { status: 500, data: undefined }
    }
}

export const getPaymentInfo = async () => {
    try {
        const user = await currentUser()
        if (!user) {
            return {
                status: 403,
                data: null,
                message: "Unauthorized!, user not found"
            }
        }

        const paymentInfo = await client.user.findUnique({
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
        })

        if (paymentInfo) {
            return {
                status: 200,
                data: paymentInfo,
                message: "Payment info fetch successfully"
            }
        }

        return {
            status: 404,
            data: null,
            message: "no payment info found"
        }
    } catch (error) {
        return {
            status: 500,
            data: null,
            message: "Oops! something went wrong"
        }
    }

}

export const getFirstView = async () => {
    try {
        const user = await currentUser()
        if (!user) return {
            status: 403,
            data: false
        }
        const userData = await client.user.findUnique({
            where: {
                clerkid: user.id,
            },
            select: {
                firstView: true,
            },
        })

        if (userData) {
            return {
                status: 200,
                data: userData.firstView
            }
        }

        return {
            status: 400,
            data: false
        }
    } catch (error) {
        return {
            status: 500,
            data: false
        }
    }
}

export const enableFirstView = async (state: boolean) => {
    try {
        const user = await currentUser()
        if (!user) return {
            status: 403,
            data: "Unauthorized! user not found"
        }

        const view = await client.user.update({
            where: {
                clerkid: user.id,
            },
            data: {
                firstView: state,
            },
        })

        if (view) {
            return { status: 200, data: "Setting updated" }
        }
        return {
            status: 400,
            data: "Setting not updated"
        }
    } catch (error) {
        return {
            status: 500,
            data: "Oops! something went wrong"
        }
    }
}

export const getUserProfile = async () => {
    try {
        const user = await currentUser()
        if (!user) {
            return {
                status: 403,
                data: "Unauthorized!"
            }
        }
        const profileIdAndImage = await client.user.findUnique({
            where: {
                clerkid: user.id,
            },
            select: {
                image: true,
                id: true,
            },
        })

        if (profileIdAndImage) return {
            status: 200,
            data: profileIdAndImage
        }
        return {
            status: 400,
            data: null
        }
    } catch (error) {
        return {
            status: 500,
            data: null
        }
    }
}

export const getVideoComments = async (id: string) => {
    try {
        const comments = await client.comment.findMany({
            where: {
                OR: [{ videoId: id }, { commentId: id }],
                commentId: null,
            },
            include: {
                reply: {
                    include: {
                        User: true,
                    },
                },
                User: true,
            },
        })
        return { status: 200, data: comments }
    } catch (error) {
        return { status: 500, data: [] }
    }
}

export const createCommentAndReply = async (
    userId: string,
    comment: string,
    videoId: string,
    commentId?: string | undefined
) => {
    try {
        if (commentId) {
            const reply = await client.comment.update({
                where: {
                    id: commentId,
                },
                data: {
                    reply: {
                        create: {
                            comment,
                            userId,
                            videoId,
                        },
                    },
                },
            })
            if (reply) {
                return { status: 200, data: 'Reply posted' }
            }
        }

        const newComment = await client.video.update({
            where: {
                id: videoId,
            },
            data: {
                Comment: {
                    create: {
                        comment,
                        userId,
                    },
                },
            },
        })
        if (newComment) return { status: 200, data: 'New comment added' }
    } catch (error) {
        return { status: 400 }
    }
}

export const inviteMembers = async (
    workspaceId: string,
    receiverId: string,
    email: string
) => {
    try {
        // Check for authenticated user
        const user = await currentUser();
        if (!user) {
            return { status: 403, data: "Unauthorized! No user found" };
        }

        // Fetch sender information
        const senderInfo = await client.user.findUnique({
            where: { clerkid: user.id },
            select: { firstname: true, lastname: true, id: true },
        });
        if (!senderInfo?.id) {
            return { status: 404, data: "Sender not found" };
        }

        // Verify workspace existence
        const workspace = await client.workSpace.findUnique({
            where: { id: workspaceId },
            select: { name: true },
        });
        if (!workspace) {
            return { status: 404, data: "Workspace not found" };
        }

        // Check if the receiver exists
        const receiverInfo = await client.user.findUnique({
            where: { id: receiverId },
            select: { id: true, email: true },
        });
        if (!receiverInfo) {
            return { status: 404, data: "Receiver not found" };
        }

        // Create invitation record
        const invitation = await client.invite.create({
            data: {
                senderId: senderInfo.id,
                recieverId: receiverId,
                workSpaceId: workspaceId,
                content: `You are invited to join ${workspace.name} Workspace, Click accept to confirm.`,
            },
            select: { id: true },
        });
        if (!invitation) {
            return { status: 400, data: "Invitation creation failed" };
        }

        // Update notification for sender
        await client.user.update({
            where: { clerkid: user.id },
            data: {
                notification: {
                    create: {
                        content: `${senderInfo.firstname} ${senderInfo.lastname} invited ${receiverInfo.email} to join ${workspace.name}.`,
                    },
                },
            },
        });

        // Send invitation email
        const { transporter, mailOptions } = await sendEmail(
            email,
            "You got an invitation",
            `You are invited to join ${workspace.name} Workspace. Click accept to confirm.`,
            `<a href="${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invitation.id}" style="background-color: #000; padding: 5px 10px; border-radius: 10px;">Accept Invite</a>`
        );

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("🔴 Email send error:", error.message);
            } else {
                console.log("✅ Email sent:", info.response);
            }
        });

        return { status: 200, data: "Invite sent" };

    } catch (error) {
        console.error("❗Invite Members Error:", error);
        return { status: 500, data: "Oops! Something went wrong" };
    }
};


export const acceptInvite = async (inviteId:string) => {
    try {
        const user = await currentUser()
        if(!user) {
            return { status: 403 }
        }
        const invitation = await client.invite.findUnique({
            where: {
                id: inviteId,
            },
            select: {
                workSpaceId: true,
                reciever: {
                    select: {
                        clerkid: true,
                    },
                },
            },
        })

        if (user.id !== invitation?.reciever?.clerkid) return { status: 401 }

        const acceptInvite = client.invite.update({
            where: {
                id: inviteId,
            },
            data: {
                accepted: true,
            },
        })

        const updateMember = client.user.update({
            where: {
                clerkid: user.id,
            },
            data: {
                members: {
                    create: {
                        workSpaceId: invitation.workSpaceId,
                    },
                },
            },
        })

        const membersTransaction = await client.$transaction([
            acceptInvite,
            updateMember,
        ])

        if(membersTransaction) {
            return { status: 200 }
        }
        return { status: 400 }
    } catch (error) {
        return { status: 400 }
    }
}

export const completeSubscription = async (session_id: string)=> {
    try {
        const user = await currentUser()
        if(!user) return { status: 404 }

        const session = await stripe.checkout.sessions.retrieve(session_id)
        if(session) {
            const customer = await client.user.update({
                where: {
                    clerkid: user.id,
                },
                data: {
                    subscription: {
                        update: {
                            data: {
                                customerId: session.customer as string,
                                plan: "PRO",
                            },
                        },
                    },
                },
            })
            if(customer) {
                return { status: 200 }
            }
        }
        return { status: 404 }
    } catch (error) {
        return { status: 404 }
    }
}