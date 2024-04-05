'use client'

import { z } from 'zod'
import Link from 'next/link'
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
import { SignUpSchema } from '../_actions/schema'
import { signup } from '../_actions/signup'

export default function Page() {
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
        <Card className="w-80 space-y-2">
            <CardHeader>Pomofy Sign Up</CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                        <Input placeholder="password" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button variant={'default'} className="w-full">
                            Sign Up
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex items-center justify-center gap-2 text-sm">
                <p>Have an account?</p>
                <Link href="/auth/login" className="hover:text-blue-700 hover:font-bold">
                    {' '}
                    Log In
                </Link>
            </CardFooter>
        </Card>
    )
}
