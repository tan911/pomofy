import { z } from 'zod'

const Status = ['Todo', 'Inprogress', 'Completed'] as const
const Priority = ['High', 'Normal', 'Low'] as const

export const CreateTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(Status),
    priority: z.enum(Priority),
    date: z.string(),
})
