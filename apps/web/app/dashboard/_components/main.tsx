'use client'

import { format } from 'date-fns'

import CreateTaskForm from './sidebar/create-task-form'
import Pomodoro from './timer-display/pomodoro'
import ShortBreak from './timer-display/short-break'
import LongBreak from './timer-display/long-break'
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

export default function Main({ id }: { id: string }) {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', id)
    }

    return (
        <>
            <div className="col-span-3 md:col-span-2 p-5 mt-[75px]">
                <h1 className="text-xl mb-5">{format(new Date(), 'PPPP')}</h1>
                <div className="w-full flex items-center justify-center gap-5 mb-10">
                    <Pomodoro />
                    <ShortBreak />
                    <LongBreak />
                </div>
                <div className="mb-10">
                    <div>
                        <Button variant={'outline'}>10</Button>
                        <span>Todo</span>
                    </div>
                    <div>
                        <Button variant={'outline'}>20</Button>
                        <span>Inprogress</span>
                    </div>
                    <div>
                        <Button variant={'outline'}>43</Button>
                        <span>Completed</span>
                    </div>
                </div>
                <div>
                    <Card className="mb-5">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between mb-2">
                                <span>Task 1</span>
                                <Badge variant="outline">{format(new Date(), 'PPP')}</Badge>
                            </CardTitle>
                            <CardDescription className="text-center md:text-left">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
                                consequatur dolores beatae adipisci sequi ullam, nam itaque enim
                                recusandae, quidem quod sit fuga, deserunt minima omnis quasi nobis
                                quo dolorum.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex flex-col gap-5 md:flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Switch id="card-status" />
                                <label htmlFor="card-status">Inprogress</label>
                            </div>
                            <Button type="button" variant={'default'}>
                                Mark complete
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <div className="hidden fixed right-0 w-1/3 h-screen md:flex items-center justify-center border-l border-slate-300 z-2">
                <CreateTaskForm />
            </div>
        </>
    )
}
