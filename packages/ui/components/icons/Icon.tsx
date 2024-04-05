import { icons } from 'lucide-react'

type TIcon = {
    name: keyof typeof icons
    size: number
    color?: string
    className?: string
}

export const Icon = ({ name, color, size, className }: TIcon) => {
    const LucideIcon = icons[name]

    return <LucideIcon color={color} size={size} className={className} />
}
