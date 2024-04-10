'use server'

import { z } from 'zod'
import { createPomoSchema } from './schema'

export async function createTask(data: z.infer<typeof createPomoSchema>, token: string) {
    const res = await fetch('http://localhost:5000/api/v1/task', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    console.log(res)
}
