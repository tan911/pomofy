import { redirect } from 'next/navigation'

import { validateRequest } from '@/lib/auth'
import Activities from './_components/activity-data'

export default async function Page() {
    const { user, session } = await validateRequest()

    if (!user) {
        return redirect('/auth/signup')
    }

    return (
        <>
            <div className="grid grid-cols-3 grid-rows-1 grid-flow-col md:w-3/4">
                <div className="col-span-3 p-5 mt-[75px] w-full">
                    <Activities tokenId={session.id} />
                </div>
            </div>
        </>
    )
}
