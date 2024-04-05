import { Button } from '@pomofy/ui'

export default function ShortBreak() {
    return (
        <div className="flex flex-col gap-2">
            <span>Short Break</span>
            <Button
                variant={'outline'}
                className="rounded-full w-20 h-20 bg-teal-400 text-white font-bold border-4 border-teal-500"
            >
                05:00
            </Button>
        </div>
    )
}
