import { redirect } from 'next/navigation'
import { validateRequest } from '@/lib/auth'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const { user } = await validateRequest()

    if (user) {
        return redirect('/dashboard')
    }

    return (
        <main className="relative md:flex md:items-center w-full h-screen">
            <div className="hidden h-full md:border-r md:border-slate-700 md:flex md:w-[400px] lg:w-[700px]">
                <div className="m-auto">
                    <h1 className="font-bold sm:text-4xl lg:text-6xl leading-10">Pomofy Account</h1>
                    <p className="text-right mt-4 font-semibold leading-relaxed opacity-90">
                        We're so excited to have you join us!
                    </p>
                </div>
            </div>
            <div className="mx-2 pt-32 md:pt-0 md:w-[500px] md:pl-[30px] lg:w-[600px] lg:pl-[90px] lg:flex lg:flex-start">
                {children}
            </div>
        </main>
    )
}
