type TData = {
    id: string
    taskId: string
    title: string
    description: string
    date: Date
    status: 'Inprogess' | 'Todo' | 'Completed'
    priority: 'Low' | 'Priority' | 'High'
}[]

export default function Table({ data }: { data: TData }) {
    return (
        <table className="table-auto min-w-full text-left">
            <thead>
                <tr>
                    <th className="flex items-center gap-3 py-5">
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
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Finish date</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {data?.map((item) => (
                    <tr key={item.taskId + item.id}>
                        <td className="flex items-center gap-3 py-4">
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
                        <td>{item.status}</td>
                        <td>{item.priority}</td>
                        <td>{'wed'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
