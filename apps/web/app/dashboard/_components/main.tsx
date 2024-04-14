'use client'

import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'

import useLocalSessionId from '@/hooks/useLocalSessionId'
import { Services } from '../_actions/task-action'
import CreateTaskForm from './sidebar/create-task-form'
import Pomodoro from './timer-display/pomodoro'
import ShortBreak from './timer-display/short-break'
import LongBreak from './timer-display/long-break'
import TaskList from './task-list'
import LineChart from './chart/line'

import { Card, CardContent, CardHeader, Skeleton } from '@pomofy/ui'
import { Icon } from '@pomofy/ui/icons'

export default function Main({ tokenId }: { tokenId: string }) {
    useLocalSessionId(tokenId)

    const { data: result, isLoading } = useQuery({
        queryFn: () => Services.getData(),
        queryKey: ['taskList'],
    })

    return (
        <>
            <div className="col-span-3 md:col-span-2 p-5 mt-[75px] w-full md:[960px]">
                <div className="flex flex-col items-center justify-between gap-5 mb-5 md:flex-row">
                    <Card className="w-full">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <p className="text-sm font-bold">Total Todo</p>
                            <Icon name="ListTodo" size={23} />
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-3xl font-bold">{result?.data.todoItems ?? 0}</h3>
                        </CardContent>
                    </Card>
                    <Card className="w-full">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <p className="text-sm font-bold">Total Inprogress</p>
                            <Icon name="Pickaxe" size={23} />
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-3xl font-bold">
                                {result?.data.inProgressItems ?? 0}
                            </h3>
                        </CardContent>
                    </Card>
                    <Card className="w-full">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <p className="text-sm font-bold">Total Completed</p>
                            <Icon name="ListChecks" size={23} />
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-3xl font-bold">
                                {result?.data.completedItems ?? 0}
                            </h3>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col xl:flex-row gap-5 md:justify-between mb-5">
                    <Card className="w-full xl:w-[853px]">
                        <CardHeader>
                            <p>Overview</p>
                        </CardHeader>
                        <CardContent>
                            <LineChart
                                todo={result?.data.todoItems}
                                inProgress={result?.data?.inProgressItems}
                                totalCompleted={result?.data.completedItems}
                            />
                        </CardContent>
                    </Card>
                    <Card className="w-full xl:w-[853px]">
                        <CardHeader>
                            <p>{format(new Date(), 'PPPP')}</p>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full flex items-center justify-center gap-5 mb-10">
                                <Pomodoro />
                                <ShortBreak />
                                <LongBreak />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    {isLoading ? (
                        <div className="h-[150px]">
                            <div className="p-[24px]">
                                <div className="flex items-center justify-between mb-2">
                                    <Skeleton className="h-[24px] w-[200px]" />
                                    <Skeleton className="h-[34px] w-[100px] " />
                                </div>
                                <Skeleton className="h-[24px] w-1/2" />
                            </div>
                            <div className="flex flex-col gap-5 md:flex-row items-center justify-between px-[24px] pb-[24px]">
                                <Skeleton className="h-[24px] w-[90px]" />
                                <Skeleton className="h-[40px] w-[190px]" />
                            </div>
                        </div>
                    ) : (
                        <TaskList data={result?.data?.items} />
                    )}
                </div>
            </div>
            <div className="hidden fixed right-0 w-1/3 h-screen md:flex items-center justify-center border-l border-slate-300 z-2">
                <CreateTaskForm />
            </div>
        </>
    )
}
