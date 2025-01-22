// import { client } from '@/lib/prisma'
// import { NextRequest, NextResponse } from 'next/server'

// export async function POST(
//   req: NextRequest,
//   { params }: {params: {id: string}}
// ) {
//   try {
//     const body = await req.json()

//     const {id} = await params

//     const personalworkspaceId = await client.user.findUnique({
//       where: {
//         id,
//       },
//       select: {
//         workspace: {
//           where: {
//             type: 'PERSONAL',
//           },
//           select: {
//             id: true,
//           },
//           orderBy: {
//             createdAt: 'asc',
//           },
//         },
//       },
//     })

//     const startProcessingVideo = await client.workSpace.update({
//       where: {
//         id: personalworkspaceId?.workspace[0].id,
//       },
//       data: {
//         videos: {
//           create: {
//             source: body.filename,
//             userId: id,
//           },
//         },
//       },
//       select: {
//         User: {
//           select: {
//             subscription: {
//               select: {
//                 plan: true,
//               },
//             },
//           },
//         },
//       },
//     })

//     if (startProcessingVideo) {
//       return NextResponse.json({
//         status: 200,
//         plan: startProcessingVideo.User?.subscription?.plan,
//       })
//     }
//     return NextResponse.json({ status: 400 })
//   } catch (error) {
//     console.log('🔴 Error in processing video', error)
//   }
// }


import { client } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const { id } = params

    const personalworkspaceId = await client.user.findUnique({
      where: {
        id,
      },
      select: {
        workspace: {
          where: {
            type: 'PERSONAL',
          },
          select: {
            id: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })
    const startProcessingVideo = await client.workSpace.update({
      where: {
        id: personalworkspaceId?.workspace[0].id,
      },
      data: {
        videos: {
          create: {
            source: body.filename,
            userId: id,
          },
        },
      },
      select: {
        User: {
          select: {
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
      },
    })

    if (startProcessingVideo) {
      return NextResponse.json({
        status: 200,
        plan: startProcessingVideo.User?.subscription?.plan,
      })
    }
    return NextResponse.json({ status: 400 })
  } catch (error) {
    console.log('🔴 Error in processing video', error)
  }
}
