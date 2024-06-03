"use client"

import { generatePagination, hasNextGroup, hasPreviousGroup } from "@/utils/generatePages"
import clsx from "clsx"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get("page")) || 1

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    const allPages = generatePagination(currentPage, totalPages)
    const prevDisabled = currentPage <= 5
    const nextDisabled = !hasNextGroup(currentPage, totalPages)

    return (
        <div className="flex flex-row justify-center items-center font-pretendard text-xxs text-GREY-80">
            <Link href={createPageURL(Math.max(currentPage - 5, 1))}>
                <button disabled={prevDisabled}>&lt; 이전</button>
            </Link>
            <div className="flex flex-row justify-center items-center mx-4">
                {allPages.map((page, index) => {
                    return (
                        <PaginationNumber
                            key={index}
                            href={createPageURL(page)}
                            page={page}
                            isActive={currentPage === page}
                        />
                    )
                })}
            </div>
            <Link href={createPageURL(currentPage + 5)}>
                <button disabled={nextDisabled}>다음 &gt;</button>
            </Link>
        </div>
    )
}

function PaginationNumber({ page, href, isActive }: { page: number | string; href: string; isActive: boolean }) {
    const className = clsx("flex w-[25px] h-[25px] items-center justify-center mx-1.5", {
        "z-10 border-[1px] border-SYSTEM-black rounded-full text-SYSTEM-black": isActive,
        "hover:bg-GREY-30 rounded-full": !isActive,
    })
    return isActive ? (
        <div className={className}>{page}</div>
    ) : (
        <Link href={href} className={className}>
            {page}
        </Link>
    )
}
