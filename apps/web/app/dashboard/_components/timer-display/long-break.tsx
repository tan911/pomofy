import { Button } from '@pomofy/ui'

export default function LongBreak() {
    return (
        <div className="flex flex-col gap-4">
            <span className="text-sm">Long Break</span>
            <Button
                variant={'outline'}
                className="rounded-full w-20 h-20 bg-blue-400 text-white font-bold border-4 border-blue-500"
            >
                15:00
            </Button>
        </div>
    )
}
