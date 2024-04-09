'use server'

import { z } from 'zod'
import { cookies } from 'next/headers'
import { lucia } from '@pomofy/lucia-auth'

import { createPomoSchema } from './schema'

export async function createTask(data: z.infer<typeof createPomoSchema>) {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null

    if (!sessionId) {
        return 'Something went wrong'
    }

    const res = await fetch('http://localhost:5000/api/v1', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionId}`,
        },
    })

    console.log(res)
}
