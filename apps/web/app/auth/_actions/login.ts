'use server'

import { z } from 'zod'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { lucia, Argon2id } from '@pomofy/lucia-auth'
import { prisma } from '@pomofy/prisma'
import { LoginSchema } from './schema'
import { actionStatus, actionMessage } from './actionStatus'

export async function login(data: z.infer<typeof LoginSchema>) {
    try {
        const isUserDataValid = await LoginSchema.safeParseAsync(data)

        if (!isUserDataValid.success) {
            return actionStatus('ERROR', actionMessage.LOGIN_FAILED)
        }

        const { email, password } = isUserDataValid.data

        const isUserExist = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if (!isUserExist) {
            return actionStatus('ERROR', actionMessage.LOGIN_FAILED)
        }

        const isPasswordValid = await new Argon2id().verify(
            isUserExist.password as string,
            password
        )

        if (!isPasswordValid) {
            return actionStatus('ERROR', actionMessage.LOGIN_FAILED)
        }

        const session = await lucia.createSession(isUserExist.id, {})
        const sessionCookie = await lucia.createSessionCookie(session.id)

        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    } catch (error) {
        console.log(error)
        return actionStatus('ERROR', actionMessage.SOMETHING_WRONG)
    }

    return redirect('/dashboard')
}
