import { format } from 'date-fns'

type TPayload = {
    chartType: undefined
    color: string
    dataKey: string
    fill: string
    fillOpacity: number
    formatter: undefined
    hide: boolean
    name: string
    payload: { date: Date; count: number }
    stroke: string
    strokeWidth: number
    type: undefined
    unit: undefined
    value: number
}[]

type TCustomToolTip = {
    active: boolean
    payload: TPayload
    label: string
}

export default function CustomToolTip({ active, payload, label }: TCustomToolTip) {
    if (active && payload && payload.length) {
        return (
            <div className="flex flex-col bg-[#19aefe7f] p-2 rounded-md">
                <p className="font-bold text-md">{`${payload[0]?.value} task(s)`}</p>
                <p className="">{`${format(new Date(label), 'PPPP')}`}</p>
            </div>
        )
    }

    return null
}
