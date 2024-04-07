import { format } from 'date-fns'
import { redirect } from 'next/navigation'

import ShortBreak from './_components/timer-display/short-break'
import Pomodoro from './_components/timer-display/pomodoro'
import LongBreak from './_components/timer-display/long-break'
import CreateTaskForm from './_components/sidebar/create-task-form'
import { validateRequest } from '@/lib/auth'
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

export default async function Page() {
    const { user } = await validateRequest()

    if (!user) {
        return redirect('/auth/signup')
    }

    return (
        <div className="grid grid-cols-3 grid-rows-1 grid-flow-col">
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
        </div>
    )
}
