import { redirect } from 'next/navigation'
import { validateRequest } from '@/lib/auth'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const { user } = await validateRequest()

    if (user) {
        return redirect('/dashboard')
    }

    return (
        <main className="relative flex items-center w-full h-screen">
            <div className="bg-primary h-full w-[300px]"></div>
            <div className="mx-auto">{children}</div>
        </main>
    )
}
