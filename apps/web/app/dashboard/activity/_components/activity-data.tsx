'use client'

import { useQuery } from '@tanstack/react-query'

import { Services } from '../../_actions/task-action'
import { Card, CardContent, CardHeader, Skeleton } from '@pomofy/ui'
import Table from './activity-table'
import useLocalSessionId from '@/hooks/useLocalSessionId'

export default function Activities({ tokenId }: { tokenId: string }) {
    useLocalSessionId(tokenId)

    const { data: result, isLoading } = useQuery({
        queryFn: () => Services.getData(),
        queryKey: ['taskList'],
    })

    return (
        <Card className="w-full border-0 h-[600px]">
            <CardHeader>
                <h1>Activity List</h1>
                <p>
                    100 <span>total</span>
                </p>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Skeleton className="w-full h-[476px]" />
                ) : result?.data.items.length !== 0 ? (
                    <Table data={result?.data.items} />
                ) : (
                    <div className="opacity-70 my-auto h-[476px] flex items-center justify-center">
                        <div>No data available</div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
