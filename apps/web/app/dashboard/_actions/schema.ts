import { z } from 'zod'

const StatusEnum = z.enum(['Todo', 'Inprogress'])
const PriorityEnum = z.enum(['High', 'Normal', 'Low'])
export const createPomoSchema = z.object({
    task: z
        .string()
        .min(5, {
            message: 'Task must be at least 5 characters',
        })
        .max(20, {
            message: 'Task must not be longer than 20 characters.',
        }),
    description: z
        .string()
        .min(10, {
            message: 'Description must be at least 10 characters',
        })
        .max(160, {
            message: 'Task must not be longer than 30 characters.',
        }),
    date: z.date({
        required_error: 'Due date is required.',
    }),
    status: StatusEnum,
    priority: PriorityEnum,
})
