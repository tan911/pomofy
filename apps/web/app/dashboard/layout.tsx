import { Avatar, AvatarFallback, AvatarImage } from '@pomofy/ui'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <header className="fixed top-0 w-full z-10 border-b border-slate-300 py-4 px-8 bg-slate-100">
                <nav className="flex justify-between items-center">
                    <div>LOGO</div>
                    <div>Pomofy</div>
                    <div className="flex items-center gap-4">
                        <div>DARK MODE</div>
                        <div>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>me</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </nav>
            </header>
            <div>{children}</div>
        </main>
    )
}
