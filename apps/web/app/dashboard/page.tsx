import { redirect } from 'next/navigation'

import { validateRequest } from '@/lib/auth'
import Main from './_components/main'

export default async function Page() {
    const { user, session } = await validateRequest()

    if (!user) {
        return redirect('/auth/signup')
    }

    return (
        <div className="grid grid-cols-3 grid-rows-1 grid-flow-col">
            <Main id={session.id} />
        </div>
    )
}
