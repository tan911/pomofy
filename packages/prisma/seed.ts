import { PrismaClient } from '@prisma/client'
import { Argon2id } from 'oslo/password'

const prisma = new PrismaClient()

async function main() {
    await prisma.user.upsert({
        where: { email: 'mike@test.com' },
        update: {},
        create: {
            name: 'Mike',
            email: 'mike@test.com',
            password: await new Argon2id().hash('password123'), // to keep things simple
            emailVerified: true,
        },
    })
}

if (process.env.NODE_ENV === 'development') {
    main()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.log(e)
            await prisma.$disconnect()
            process.exit(1)
        })
}
