import Link from 'next/link'

export default function Page(): JSX.Element {
    return (
        <main className="mx-auto flex h-screen flex-col items-center justify-center gap-3 px-5 sm:container">
            <div className="max-w-[900px] text-center">
                <h1 className="text-2xl md:text-lg lg:text-5xl">
                    <span className="block text-7xl leading-normal font-bold mb-2">Pomofy</span>
                    <span className="py-2 font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text inline-block text-transparent">
                        Efficiency and Scalability at Your Fingertips
                    </span>
                </h1>
                <p className="my-5 py-2 leading-relaxed">
                    Spruce up your task management with Pomofy, an app featuring a Pomodoro timer!
                    Stay focused and boost productivity with this simple and appealing tool.
                </p>
            </div>
            <div className="flex flex-row gap-2">
                <Link
                    href="/auth/signup"
                    className="shadown-md rounded-md bg-blue-500 text-white dark:bg-slate-100 px-4 py-2 text-sm md:text-md dark:text-gray-900 dark:hover:bg-slate-200 md:text-mobmd md:font-semibold"
                >
                    Sign Up
                </Link>
                <Link
                    href="/auth/login"
                    className="shadown-md rounded-md bg-primary px-4 py-2 text-sm md:text-md text-white text-center hover:opacity-90 md:text-md md:font-semibold"
                >
                    Log In
                </Link>
            </div>
        </main>
    )
}
