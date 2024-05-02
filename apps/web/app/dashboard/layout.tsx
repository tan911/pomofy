import Link from 'next/link'

import Profile from './_components/profile/profile'
import ThemeModeToggle from './_components/theme'
import CreateTaskForm from './_components/sidebar/create-task-form'

import { Icon } from '@pomofy/ui/icons'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger, Button } from '@pomofy/ui'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <header className="fixed top-0 w-full z-10 p-5 bg-secondary dark:bg-secondary text-secondary-foreground font-semi-bold md:py-4 md:px-8">
                <nav className="flex justify-between items-center">
                    <div>LOGO</div>
                    <div>Pomofy</div>
                    <div className="flex items-center gap-4">
                        <ul className="hidden lg:flex lg:gap-5">
                            <li className="p-2">
                                <Link href="/dashboard" className="block hover:text-white">
                                    Overview
                                </Link>
                            </li>
                            <li className="p-2">
                                <Link href="/dashboard/activity" className="block hover:text-white">
                                    Activity
                                </Link>
                            </li>
                        </ul>
                        <ThemeModeToggle />
                        <Profile />
                    </div>
                </nav>
            </header>
            <div className="hidden fixed right-0 w-1/4 h-screen bg-secondary dark:bg-secondary items-center justify-center z-2 md:flex">
                <CreateTaskForm />
            </div>
            <div>
                {children}
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button
                            variant="outline"
                            className="fixed right-3 bottom-3 shadow-2xl h-16 w-16 rounded-full bg-card md:hidden"
                        >
                            <Icon name="Plus" size={24} className="text-slate-400" />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className="flex items-center md:hidden">
                        <div className="px-4 w-full">
                            <CreateTaskForm className="w-full" />
                            <DrawerFooter className="w-full p-0 my-[16px]">
                                <DrawerClose asChild>
                                    <Button variant={'default'} className="text-white">
                                        Cancel
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </main>
    )
}
