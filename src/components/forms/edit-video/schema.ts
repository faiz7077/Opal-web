import { z } from 'zod'
export const editVideoInfoSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Video title must have atleast 5 characters' }),
  description: z.string().min(100, {
    message: 'Video description must have atleast 100 characters',
  }),
})