'use client'

import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
    ResponsiveContainer,
    ComposedChart,
} from 'recharts'

type TData = {
    id: string
    taskId: string
    title: string
    description: string
    date: Date
    status: 'Inprogess' | 'Todo' | 'Completed'
    priority: 'Low' | 'Priority' | 'High'
}[]

export default function Chart({ data }: { data: TData }) {
    // issue- https://github.com/recharts/recharts/issues/3615
    const error = console.error
    console.error = (...args: any) => {
        if (/defaultProps/.test(args[0])) return
        error(...args)
    }

    if (!data) {
        return
    }

    const tasksOverTime = data.reduce((acc: any, task: any) => {
        const dateString = task.date

        if (!acc[dateString]) {
            acc[dateString] = 1
        } else {
            acc[dateString]++
        }

        return acc
    }, {})

    const tasksOverTimeArray = Object.entries(tasksOverTime).map(([date, count]) => ({
        date,
        count,
    }))

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart width={500} height={300} data={tasksOverTimeArray}>
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="3%" stopColor="#19adfe" stopOpacity={0.1} />
                        <stop offset="97%" stopColor="#1f3f52" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="2 2" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="count"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#gradient)"
                />
            </ComposedChart>
        </ResponsiveContainer>
    )
}
