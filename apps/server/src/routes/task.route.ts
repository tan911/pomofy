import { Router } from 'express'
import { prisma } from '@pomofy/prisma'

const route: Router = Router()

// TODO
route.get('/', async (_, res) => {
    const [data, inprogress, todo, completed, total] = await prisma.$transaction([
        prisma.task.findMany({
            where: {
                taskId: res.locals.user?.id,
                status: {
                    in: ['Todo', 'Inprogress'],
                },
            },
            orderBy: {
                date: 'desc',
            },
        }),
        prisma.task.count({
            where: {
                taskId: res.locals.user?.id,
                status: {
                    in: ['Inprogress'],
                },
            },
        }),
        prisma.task.count({
            where: {
                taskId: res.locals.user?.id,
                status: {
                    in: ['Todo'],
                },
            },
        }),
        prisma.task.count({
            where: {
                taskId: res.locals.user?.id,
                status: {
                    in: ['Completed'],
                },
            },
        }),
        prisma.task.count({
            where: {
                taskId: res.locals.user?.id,
                status: {
                    in: ['Todo', 'Inprogress'],
                },
            },
        }),
    ])

    res.status(200).json({
        message: 'success',
        items: data,
        inProgressItems: inprogress,
        todoItems: todo,
        completedItems: completed,
        totalItems: total,
    })
})

route.post('/', async (req, res) => {
    const task = await prisma.task.create({
        data: {
            user: { connect: { id: res.locals.user?.id } },
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status,
            date: req.body.date,
        },
    })

    res.status(201).json({ message: 'success', data: task })
})

route.patch('/', async (req, res) => {
    await prisma.task.update({
        where: {
            id: req.body.id,
        },
        data: {
            status: 'Completed',
        },
    })
    res.status(200).json({ message: 'Update Success' })
})

route.delete('/:id', (req, res) => {
    res.status(201).json({
        message: 'deleted',
        id: req.params.id,
    })
})

export default route
