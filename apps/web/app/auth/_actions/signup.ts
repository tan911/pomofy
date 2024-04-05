'use server'

import { z } from 'zod'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { lucia, Argon2id } from '@pomofy/lucia-auth'
import { prisma } from '@pomofy/prisma'
import { SignUpSchema } from './schema'

export async function signup(data: z.infer<typeof SignUpSchema>) {
    try {
        const isUserDataValid = await SignUpSchema.safeParseAsync(data)

        if (!isUserDataValid.success) {
            return {
                message: 'user invalid',
            }
        }

        const { email, name, password } = isUserDataValid.data

        const isUserExist = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if (isUserExist) {
            return {
                message: 'User already exist',
            }
        }

        const hashedPassword = await new Argon2id().hash(password)

        const user = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashedPassword,
            },
        })

        const session = await lucia.createSession(user.id, {})
        const sessionCookie = await lucia.createSessionCookie(session.id)

        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    } catch (error) {
        console.log(error)
        return {
            message: 'An unknown error occured',
        }
    }

    return redirect('/dashboard')
}
