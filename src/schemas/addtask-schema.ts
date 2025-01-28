import { z } from 'zod'

export const addTaskSchema = z.object({
  title: z.string().min(3).max(300).nonempty(),
})
