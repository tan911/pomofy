'use client'

import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'

import useLocalSessionId from '@/hooks/useLocalSessionId'
import TaskOverview from './task/task-overview'
import Pomodoro from './timer-display/pomodoro'
import ShortBreak from './timer-display/short-break'
import LongBreak from './timer-display/long-break'
import Chart from './chart/line'
import TaskList from './task/task-list'

import { Services } from '../_actions/task-action'
import { Card, CardContent, CardHeader, Skeleton } from '@pomofy/ui'

export default function Main({ tokenId }: { tokenId: string }) {
    useLocalSessionId(tokenId)

    const { data: result, isLoading } = useQuery({
        queryFn: () => Services.getData(),
        queryKey: ['taskList'],
    })

    return (
        <>
            <div className="col-span-3 p-5 mt-[75px] w-full">
                <div className="flex flex-col xl:flex-row gap-5 md:justify-between mb-5">
                    <TaskOverview
                        todoItems={result?.data.todoItems}
                        completedItems={result?.data.completedItems}
                        inprogessItems={result?.data.inProgressItems}
                    />

                    <Card className="w-full border-0 xl:w-[853px]">
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

                <div className="mb-5">
                    {isLoading ? (
                        <div>
                            <Card>
                                <CardHeader>
                                    <Skeleton className="w-[100px] h-[20px]" />
                                </CardHeader>
                                <CardContent className="w-full h-[400px]">
                                    <Skeleton className="w-full h-[300px]" />
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <Card className="border-0">
                            <CardHeader>Task Over Time</CardHeader>
                            <CardContent className="w-full h-[400px]">
                                {result && result.data.items.length !== 0 ? (
                                    <Chart data={result?.data.items} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="opacity-50">No data available</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="lg:hidden">
                    <Card>
                        <CardHeader>Task List</CardHeader>
                        <CardContent>
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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
