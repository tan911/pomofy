import { format } from 'date-fns'
import { cn } from '@pomofy/ui/utils'
import { Icon } from '@pomofy/ui/icons'

type TData = {
    id: string
    taskId: string
    title: string
    description: string
    date: Date
    status: 'Inprogress' | 'Todo' | 'Completed'
    priority: 'Low' | 'Priority' | 'High'
}[]

function iconName(status: string) {
    switch (status) {
        case 'Inprogress':
            return 'Clock'
        case 'Completed':
            return 'CircleCheck'
        default:
            return 'ListTodo'
    }
}

export default function Table({ data }: { data: TData | undefined }) {
    return (
        <table className="table-auto min-w-full text-left">
            <thead>
                <tr>
                    <th scope="col" className="flex items-center gap-3 py-5 font-medium">
                        <div className="flex items-center">
                            <input
                                id="checkbox-head"
                                type="checkbox"
                                className="bg-secondary w-5 h-5 cursor-pointer rounded-md border-2 appearance-none checked:bg-primary checked:border-0"
                            />
                            <label htmlFor="checkbox-head" className="sr-only">
                                box header
                            </label>
                        </div>
                        Name
                    </th>
                    <th scope="col" className="font-medium">
                        Status
                    </th>
                    <th scope="col" className="font-medium">
                        Priority
                    </th>
                    <th scope="col" className="font-medium">
                        Finish date
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {data?.map((item) => (
                    <tr key={item.id}>
                        <td className="flex items-center whitespace-nowrap gap-3 py-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-item"
                                    type="checkbox"
                                    className="bg-secondary w-5 h-5 cursor-pointer rounded-md border-2 appearance-none checked:bg-primary checked:border-0"
                                />
                                <label htmlFor="checkbox-item" className="sr-only">
                                    box item
                                </label>
                            </div>
                            {item.title}
                        </td>
                        <td className="whitespace-nowrap">
                            <span
                                className={cn(
                                    'inline-flex gap-2 items-center py-1.5 px-3 rounded-full text-sm',
                                    {
                                        'bg-[#5a4932] text-[#fdb95a]': item.status === 'Inprogress',
                                        'bg-[#1f3f52] text-[#19adfe]': item.status === 'Todo',
                                        'bg-[#465656] text-[#a7ddd7]': item.status === 'Completed',
                                    }
                                )}
                            >
                                <Icon
                                    className={cn({
                                        'text-[#fdb95a]': item.status === 'Inprogress',
                                        'text-[#19adfe]': item.status === 'Todo',
                                        'text-[#a7ddd7]': item.status === 'Completed',
                                    })}
                                    name={iconName(item.status)}
                                    size={16}
                                />
                                {item.status}
                            </span>
                        </td>
                        <td className="whitespace-nowrap">{item.priority}</td>
                        <td className="whitespace-nowrap">{`${format(item.date, 'dd')} ${format(item.date, 'eee')}`}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
