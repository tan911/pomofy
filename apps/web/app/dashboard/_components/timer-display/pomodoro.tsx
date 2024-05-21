import { Button } from '@pomofy/ui'

export default function Pomodoro() {
    return (
        <div className="flex flex-col gap-4">
            <span className="text-sm">Pomodoro</span>
            <Button
                variant={'outline'}
                className="rounded-full w-20 h-20 bg-[#1f3f52] text-white font-bold border-4 border-[#19adfe]"
            >
                25:00
            </Button>
        </div>
    )
}
