import { Button } from '@pomofy/ui'

export default function LongBreak() {
    return (
        <div className="flex flex-col gap-4">
            <span className="text-sm">Long Break</span>
            <Button
                variant={'outline'}
                className="rounded-full w-20 h-20 bg-[#5a4932] text-white font-bold border-4 border-[#fdb95a]"
            >
                15:00
            </Button>
        </div>
    )
}
