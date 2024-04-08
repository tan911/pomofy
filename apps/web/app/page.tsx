import Link from 'next/link'

export default function Page(): JSX.Element {
    return (
        <main className="mx-auto flex h-screen flex-col items-center justify-center gap-3 px-5 sm:container">
            <div className="max-w-[900px] text-center">
                <h1 className="text-2xl md:text-lg lg:text-5xl">
                    <span className="block text-7xl font-bold mb-2">Pomofy</span>
                    <span className="block text-blue-600">
                        Efficiency and Scalability at Your Fingertips
                    </span>
                </h1>
                <p className="my-5">
                    Spruce up your task management with Pomofy, an app featuring a Pomodoro timer!
                    Stay focused and boost productivity with this simple and appealing tool.
                </p>
            </div>
            <div className="flex flex-row gap-2">
                <Link
                    href="/auth/signup"
                    className="shadown-md rounded-md bg-blue-600 px-4 py-2 text-sm md:text-md text-white hover:bg-blue-700 md:text-mobmd"
                >
                    Sign Up
                </Link>
                <Link
                    href="/auth/login"
                    className="shadown-md rounded-md bg-slate-800 px-4 py-2 text-sm md:text-md text-white text-center hover:bg-slate-900 md:text-md"
                >
                    Log In
                </Link>
            </div>
        </main>
    )
}
