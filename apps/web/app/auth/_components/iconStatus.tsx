import { Icon } from '@pomofy/ui/icons'
import { actionToastStatus } from '../_actions/actionStatus'

export default function IconStatus({ type }: { type: actionToastStatus }) {
    switch (type) {
        case 'ERROR':
            return <Icon name="OctagonX" size={24} color="#dc2626" />
        case 'PENDING':
            return <Icon name="LoaderCircle" size={24} className="animate-spin" />
        default:
            return <Icon name="Check" size={24} />
    }
}
