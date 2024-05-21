import { PrismaClient, Task } from '@pomofy/prisma'
import { z } from 'zod'
import { CreateTaskSchema } from './user.schema'
import type { Request } from 'express'

interface ITask {
    items: Task[]
    inProgressItems: number
    todoItems: number
    completedItems: number
    totalItems: number
}

// TODO
interface IUserService {
    getTask: (req: Request, id: string) => Promise<ITask>
}

export class UserService implements IUserService {
    constructor(private prisma: PrismaClient) {}

    async createTask({ id, input }: { id: string; input: z.infer<typeof CreateTaskSchema> }) {
        return await this.prisma.task.create({
            data: {
                user: { connect: { id: id } },
                title: input.title,
                description: input.description,
                priority: input.priority,
                status: input.status,
                date: input.date,
            },
        })
    }

    async updateTask(id: string) {
        return await this.prisma.task.update({
            where: {
                id: id,
            },
            data: {
                status: 'Completed',
            },
        })
    }

    async getTask(req: Request, id: string) {
        const [data, allData, inprogress, todo, completed, total] = await this.prisma.$transaction([
            this.prisma.task.findMany({
                skip: (Number(req.query.page) - 1) * 6,
                take: 6,
                where: {
                    taskId: id,
                    status: {
                        in: ['Completed', 'Inprogress'],
                    },
                },
                orderBy: {
                    date: 'desc',
                },
            }),
            this.prisma.task.findMany({
                where: {
                    taskId: id,
                    status: {
                        in: ['Todo', 'Inprogress'],
                    },
                },
                orderBy: {
                    date: 'desc',
                },
            }),
            this.prisma.task.count({
                where: {
                    taskId: id,
                    status: {
                        in: ['Inprogress'],
                    },
                },
            }),
            this.prisma.task.count({
                where: {
                    taskId: id,
                    status: {
                        in: ['Todo'],
                    },
                },
            }),
            this.prisma.task.count({
                where: {
                    taskId: id,
                    status: {
                        in: ['Completed'],
                    },
                },
            }),
            this.prisma.task.count({
                where: {
                    taskId: id,
                    status: {
                        in: ['Todo', 'Inprogress'],
                    },
                },
            }),
        ])
        return {
            items: data,
            allItems: allData,
            inProgressItems: inprogress,
            todoItems: todo,
            completedItems: completed,
            totalItems: total,
        }
    }
}
