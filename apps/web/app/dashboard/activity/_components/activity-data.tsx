'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { Services } from '../../_actions/task-action'
import { Card, CardContent, CardFooter, CardHeader, Skeleton } from '@pomofy/ui'
import { useEffect } from 'react'
import Table from './activity-table'
import useLocalSessionId from '@/hooks/useLocalSessionId'
import Pagination from './activity-pagination'

export default function Activities({ tokenId }: { tokenId: string }) {
    useLocalSessionId(tokenId)
    const searchParams = useSearchParams()

    const currentPage = Number(searchParams.get('page')) || 1
    const {
        data: result,
        isLoading,
        refetch,
    } = useQuery({
        queryFn: () => Services.getData(currentPage),
        queryKey: ['taskList'],
    })

    useEffect(() => {
        refetch()
    }, [currentPage])

    return (
        <Card className="w-full border-0 h-[600px]">
            <CardHeader>
                <h1>Activity List</h1>
                <p>
                    {result?.data.totalItems} <span>total</span>
                </p>
            </CardHeader>
            <CardContent className="h-[430px]">
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
            <CardFooter className="flex items-center justify-center mt-auto">
                <Pagination totalPages={Math.floor(result?.data.totalItems / 6 ?? 0)} />
            </CardFooter>
        </Card>
    )
}
