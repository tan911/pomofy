import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@pomofy/ui/global.css'
import { Toaster } from '@pomofy/ui'
import { ThemeProvider } from '@/provider/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Pomofy',
    description: 'Task management with pomodoro timer',
    icons: {
        icon: '/favicon-32x32.png',
        other: {
            rel: 'apple-touch-icon',
            url: '/apple-touch-icon.png',
        },
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} min-h-screen`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}
