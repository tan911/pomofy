'use client'

import Link from 'next/link'
import { z } from 'zod'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import IconStatus from '../_components/iconStatus'
import { LoginSchema } from '../_actions/schema'
import { login } from '../_actions/login'

import { cn } from '@pomofy/ui/utils'
import { Icon } from '@pomofy/ui/icons'
import {
    Card,
    CardContent,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Button,
    Input,
    CardHeader,
    useToast,
    CardFooter,
} from '@pomofy/ui'

export default function Page() {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const handleFormSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (data) => {
        const result = await login(data)

        if (result && result.status) {
            toast({
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
                    `${result.status === 'ERROR' && 'border border-red-600'}`
                ),
                description: (
                    <div className="flex items-center gap-4 text-base">
                        <IconStatus type={result.status} />
                        <p>{result.message}</p>
                    </div>
                ),
            })
        }
    }
    return (
        <Card className="space-y-2 md:w-full md:bg-transparent md:border-0">
            <CardHeader className="font-bold leading-relaxed">Pomofy Login</CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-900 dark:text-slate-300">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                placeholder="you@example.com"
                                                type="email"
                                                disabled={form.formState.isSubmitting}
                                                className={cn(
                                                    form.formState.errors.email?.message &&
                                                        'border border-red-500 bg-red-950 bg-opacity-50 focus-visible:ring-transparent'
                                                )}
                                                {...field}
                                            />
                                            {form.formState.errors.email?.message && (
                                                <Icon
                                                    name="CircleAlert"
                                                    size={18}
                                                    className="absolute right-0 top-[50%] bottom-[50%] h-8 translate-y-[-50%] translate-x-[-50%] text-red-500"
                                                />
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-900 dark:text-slate-300">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                placeholder="password"
                                                type="password"
                                                disabled={form.formState.isSubmitting}
                                                className={cn(
                                                    form.formState.errors.password?.message &&
                                                        'border border-red-500 bg-red-950 bg-opacity-50 focus-visible:ring-transparent'
                                                )}
                                                {...field}
                                            />
                                            {form.formState.errors.email?.message && (
                                                <Icon
                                                    name="CircleAlert"
                                                    size={18}
                                                    className="absolute right-0 top-[50%] bottom-[50%] h-8 translate-y-[-50%] translate-x-[-50%] text-red-500"
                                                />
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <Button
                            variant={'default'}
                            className="w-full text-white"
                            disabled={form.formState.isSubmitting}
                        >
                            <span className="relative">
                                {form.formState.isSubmitting && (
                                    <Icon
                                        name="Loader"
                                        size={18}
                                        className="absolute animate-spin left-[-22px]"
                                    />
                                )}
                                Login
                            </span>
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex items-center justify-center gap-2 text-xs">
                <p className="opacity-80">Don't have an account?</p>
                <Link
                    href="/auth/signup"
                    className={cn(
                        'bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent hover:opacity-80',
                        form.formState.isSubmitting ? 'pointer-events-none' : ''
                    )}
                >
                    <span className="underline underline-offset-3">Sign Up Now</span>
                </Link>
            </CardFooter>
        </Card>
    )
}
