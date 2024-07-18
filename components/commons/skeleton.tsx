import React from "react"
import { Card, Skeleton } from "@nextui-org/react"

export const SkeletonCard = () => {
    return (
        <Card className="w-[300px] h-[381px] space-y-5 p-4 rounded-lg">
            <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-GREY-70"></div>
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-GREY-30"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-GREY-30"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-GREY-70"></div>
                </Skeleton>
            </div>
        </Card>
    )
}

export const SkeletonDetailPage = () => {
    return <Skeleton className="w-full h-fit"></Skeleton>
}
