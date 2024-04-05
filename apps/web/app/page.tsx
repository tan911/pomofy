import Link from 'next/link'

export default function Page(): JSX.Element {
    return (
        <main className="mx-auto flex h-screen flex-col items-center justify-center gap-3 px-5 sm:container">
            <div className="max-w-[900px] text-center">
                <h1 className="text-2xl md:text-lg lg:text-5xl">
                    <span className="block">My portfolio management tool</span>
                    <span className="block text-blue-600">
                        Built for Efficiency and Scalability
                    </span>
                </h1>
                <p className="my-3">
                    This app showcases my ability to design and develop efficient, scalable
                    applications. It leverages powerful features like: Postgres Database,
                    Authentication, Instant APIs, Responsive design, Adaptable Growth.
                </p>
            </div>
            <div className="flex flex-row gap-2">
                <Link
                    href="/auth/signup"
                    className="shadown-md rounded-md bg-blue-600 px-4 py-2 text-mobsm text-white hover:bg-blue-700 md:text-mobmd"
                >
                    Sign Up
                </Link>
                <Link
                    href="/auth/login"
                    className="shadown-md rounded-md bg-slate-800 px-4 py-2 text-sm text-white text-center hover:bg-slate-900 md:text-md"
                >
                    Log In
                </Link>
            </div>
        </main>
    )
}
