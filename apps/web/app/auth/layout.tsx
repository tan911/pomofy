import { redirect } from 'next/navigation'
import { validateRequest } from '@/lib/auth'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const { user } = await validateRequest()

    if (user) {
        return redirect('/dashboard')
    }

    return (
        <main className="relative md:flex md:items-center w-full h-screen">
            <div className="hidden md:flex bg-primary h-full w-[300px]"></div>
            <div className="mx-2 pt-32 md:pt-0 md:mx-auto">{children}</div>
        </main>
    )
}
