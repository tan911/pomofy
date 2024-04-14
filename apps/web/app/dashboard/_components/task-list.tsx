'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'

import { Services } from '../_actions/task-action'
import { Icon } from '@pomofy/ui/icons'
import {
    Button,
    Card,
    CardTitle,
    CardDescription,
    CardHeader,
    CardFooter,
    Badge,
    Switch,
} from '@pomofy/ui'

type TData = {
    title: string
    description: string
    status: string
    priority: string
    id: string
    date: string
}

export default function TaskList({ data }: { data: TData[] }) {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (id: string) => {
            return Services.updateDataById(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['taskList'] })
        },
    })

    return (
        <ul>
            {data && data.length !== 0 ? (
                data.map((item) => (
                    <li key={item.id}>
                        <Card className="mb-5">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between mb-2">
                                    <span>{item.title}</span>
                                    <Badge className="p-2 text-xs" variant="outline">
                                        {format(new Date(), 'PPP')}
                                    </Badge>
                                </CardTitle>
                                <CardDescription className="text-center md:text-left">
                                    {item.description}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex flex-col gap-5 md:flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Switch id="card-status" />
                                    <label htmlFor="card-status">{item.status}</label>
                                </div>
                                <Button
                                    type="button"
                                    variant={'default'}
                                    onClick={() => mutation.mutate(item.id)}
                                    className="w-[190px]"
                                >
                                    <span className="relative">
                                        {mutation.isPending ? (
                                            <Icon
                                                name="LoaderCircle"
                                                size={18}
                                                className="absolute animate-spin inset-0 m-auto"
                                            />
                                        ) : (
                                            'Mark as completed'
                                        )}
                                    </span>
                                </Button>
                            </CardFooter>
                        </Card>
                    </li>
                ))
            ) : (
                <div className="opacity-50">Hmmm, you have no task! 😀</div>
            )}
        </ul>
    )
}
