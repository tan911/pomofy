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
        <Card className="w-96 space-y-2">
            <CardHeader>Pomofy Login</CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="you@example.com"
                                            type="email"
                                            disabled={form.formState.isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="password"
                                            type="password"
                                            disabled={form.formState.isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            variant={'default'}
                            className="w-full relative"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting && (
                                <Icon
                                    name="Loader"
                                    size={18}
                                    className="absolute animate-spin left-24"
                                />
                            )}
                            Login
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex items-center justify-center gap-2 text-sm">
                <p>Don't have an account?</p>
                <Link href="/auth/signup" className="hover:text-blue-700 hover:font-bold">
                    {' '}
                    Sign Up
                </Link>
            </CardFooter>
        </Card>
    )
}
