import Profile from './_components/profile/profile'
import ThemeModeToggle from './_components/theme'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <header className="fixed top-0 w-full z-10 border-b border-slate-300 py-4 px-8 bg-white dark:bg-slate-950 text-foreground">
                <nav className="flex justify-between items-center">
                    <div>LOGO</div>
                    <div>Pomofy</div>
                    <div className="flex items-center gap-4">
                        <ThemeModeToggle />
                        <Profile />
                    </div>
                </nav>
            </header>
            <div>{children}</div>
        </main>
    )
}
