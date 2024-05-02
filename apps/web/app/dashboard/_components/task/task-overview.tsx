import { Card, CardContent, CardHeader } from '@pomofy/ui'
import { Icon } from '@pomofy/ui/icons'

export default function TaskOverview({
    todoItems,
    completedItems,
    inprogessItems,
}: {
    todoItems: number
    completedItems: number
    inprogessItems: number
}) {
    return (
        <>
            <Card className="w-full border-0 xl:w-[853px]">
                <CardHeader>Task Overview</CardHeader>
                <CardContent className="w-full flex flex-col justify-between  gap-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="bg-[#1f3f52] p-3 w-[47px] h-[47px] rounded-full">
                                <Icon name="ListTodo" size={23} className="text-[#19adfe]" />
                            </div>
                            <p className="text-md leading-tight">Todo</p>
                        </div>
                        <div>
                            <p className="font-bold leading-tight text-3xl">{todoItems ?? 0}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="bg-[#5a4932] p-3 w-[47px] h-[47px] rounded-full">
                                <Icon name="Pickaxe" size={23} className="text-[#fdb95a]" />
                            </div>
                            <p className="text-md leading-tight">Inprogress</p>
                        </div>
                        <div>
                            <p className="font-bold leading-tight text-3xl">
                                {inprogessItems ?? 0}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="bg-[#465656] p-3 w-[47px] h-[47px] rounded-full">
                                <Icon name="ListChecks" size={23} className="text-[#a7ddd7]" />
                            </div>
                            <p className="text-md leading-tight">Completed</p>
                        </div>
                        <div>
                            <p className="font-bold leading-tight text-3xl">
                                {completedItems ?? 0}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
