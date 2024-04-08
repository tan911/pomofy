import Profile from './_components/profile/profile'
import ThemeModeToggle from './_components/theme'
import CreateTaskForm from './_components/sidebar/create-task-form'

import { Icon } from '@pomofy/ui/icons'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger, Button } from '@pomofy/ui'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <header className="fixed top-0 w-full z-10 border-b border-slate-300 p-5 md:py-4 md:px-8 bg-white dark:bg-slate-950 text-foreground">
                <nav className="flex justify-between items-center">
                    <div>LOGO</div>
                    <div>Pomofy</div>
                    <div className="flex items-center gap-4">
                        <ThemeModeToggle />
                        <Profile />
                    </div>
                </nav>
            </header>
            <div>
                {children}
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button
                            variant="outline"
                            className="fixed right-3 bottom-3 shadow-2xl h-16 w-16 rounded-full bg-gray-900 dark:bg-slate-900 md:hidden"
                        >
                            <Icon name="Plus" size={24} className="text-slate-400" />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className="flex items-center md:hidden">
                        <div className="px-4 w-full">
                            <CreateTaskForm className="w-full" />
                            <DrawerFooter className="w-full p-0 my-[16px]">
                                <DrawerClose asChild>
                                    <Button variant={'default'}>Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </main>
    )
}
