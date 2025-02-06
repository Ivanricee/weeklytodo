import { z } from 'zod'

export const addTaskSchema = z.object({
  title: z.string().min(3, 'At least 3 chars').max(300, 'Max 300 chars').nonempty("Can't be empty"),
})
