'use client'

import Link from 'next/link'
import { z } from 'zod'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
    CardFooter,
} from '@pomofy/ui'
import { cn } from '@pomofy/ui/utils'
import { Icon } from '@pomofy/ui/icons'
import { SignUpSchema } from '../_actions/schema'
import { signup } from '../_actions/signup'

export default function Page() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    })

    const handleFormSubmit: SubmitHandler<z.infer<typeof SignUpSchema>> = async (data) => {
        await signup(data)
    }

    return (
        <Card className="md:w-96 space-y-2">
            <CardHeader>Pomofy Sign Up</CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Name</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                placeholder="name"
                                                type="text"
                                                disabled={form.formState.isSubmitting}
                                                className={cn(
                                                    form.formState.errors.name?.message &&
                                                        'border border-red-500 bg-red-950 bg-opacity-50 focus-visible:ring-transparent'
                                                )}
                                                {...field}
                                            />
                                            {form.formState.errors.name?.message && (
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Email</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                disabled={form.formState.isSubmitting}
                                                placeholder="you@example.com"
                                                type="email"
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
                                    <FormLabel className="text-slate-300">Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                disabled={form.formState.isSubmitting}
                                                placeholder="password"
                                                type={isPasswordVisible ? 'text' : 'password'}
                                                className={cn(
                                                    form.formState.errors.password?.message &&
                                                        'border border-red-500 bg-red-950 bg-opacity-50 focus-visible:ring-transparent'
                                                )}
                                                {...field}
                                            />
                                            {form.formState.errors.password?.message && (
                                                <Icon
                                                    name="CircleAlert"
                                                    size={18}
                                                    className="absolute right-12 top-[50%] bottom-[50%] h-8 translate-y-[-50%] translate-x-[-50%] text-red-500"
                                                />
                                            )}

                                            <Button
                                                variant={'outline'}
                                                type="button"
                                                className="absolute right-[-18px] top-[50%] bottom-[50%] h-8 translate-y-[-50%] translate-x-[-50%] opacity-50"
                                                onClick={() =>
                                                    setIsPasswordVisible(!isPasswordVisible)
                                                }
                                            >
                                                <Icon
                                                    name={isPasswordVisible ? 'EyeOff' : 'Eye'}
                                                    size={12}
                                                />
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <Button
                            variant={'default'}
                            className="w-full"
                            disabled={form.formState.isSubmitting}
                        >
                            Sign Up
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex items-center justify-center gap-2 text-xs">
                <p className="opacity-80">Have an account?</p>
                <Link
                    href="/auth/login"
                    className={cn(
                        'hover:text-blue-700',
                        form.formState.isSubmitting ? 'pointer-events-none' : ''
                    )}
                >
                    <span className="underline underline-offset-3">Log In Now</span>
                </Link>
            </CardFooter>
        </Card>
    )
}
