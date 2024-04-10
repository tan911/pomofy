'use client'

import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'

import { createTask } from '../../_actions/create-task'
import { createPomoSchema } from '../../_actions/schema'
import { CalendarIcon } from '@pomofy/ui/icons'
import { cn } from '@pomofy/ui/utils'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Button,
    Input,
    Textarea,
    Calendar,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@pomofy/ui'

export default function CreateTaskForm({ className = 'w-2/3' }: { className?: string }) {
    const form = useForm<z.infer<typeof createPomoSchema>>({
        resolver: zodResolver(createPomoSchema),
        defaultValues: {
            title: '',
            description: '',
        },
    })

    const handleFormSubmit: SubmitHandler<z.infer<typeof createPomoSchema>> = async (data) => {
        const token = window.localStorage.getItem('token') ?? ''
        await createTask(data, token)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className={cn('space-y-4', className)}
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">Task</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" type="text" {...field} />
                            </FormControl>
                            <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Description"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel className="sr-only">Due date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-full pl-3 text-left font-normal',
                                                !field.value && 'text-muted-foreground'
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, 'PPP')
                                            ) : (
                                                <span>Pick a due date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date('1900-01-01')
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center gap-2 w-full">
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="sr-only">status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Todo">Todo</SelectItem>
                                        <SelectItem value="Inprogress">Inprogress</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="sr-only">priority</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Priority" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="High">High</SelectItem>
                                        <SelectItem value="Normal">Normal</SelectItem>
                                        <SelectItem value="Low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" variant={'default'} className="w-full">
                    Create Task
                </Button>
            </form>
        </Form>
    )
}
