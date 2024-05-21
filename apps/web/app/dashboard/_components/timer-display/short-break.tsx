import { Button } from '@pomofy/ui'

export default function ShortBreak() {
    return (
        <div className="flex flex-col gap-4">
            <span className="text-sm">Short Break</span>
            <Button
                variant={'outline'}
                className="rounded-full w-20 h-20 bg-[#465656] text-white font-bold border-4 border-[#a7ddd7]"
            >
                05:00
            </Button>
        </div>
    )
}
