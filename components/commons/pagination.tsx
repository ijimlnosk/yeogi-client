"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { PaginationNumberProps, PaginationProps } from "./type"
import { generatePagination } from "@/utils/pagination.utils"

/**
 * @function Pagination
 * @param totalPages 전체 페이지
 * @param currentPage URL의 page 매개변수에서 가져옴 (기본값 = 1)
 * @const pathname 현재 경로
 * @const searchParams URL의 검색 매개변수
 * @const allPages generatePagination 함수를 사용하여 현재 페이지와 전체 페이지 수에 기반하여 표시할 페이지 목록을 생성
 * @const prevDisabled 현재 페이지가 5 이하일 경우 true로 설정하여 이전 버튼을 비활성화
 * @const nextDisabled 다음 그룹이 없을 경우 true로 설정하여 다음 버튼을 비활성화
 * @returns 화면에 렌더될 숫자 버튼 배열과 이전, 다음 버튼을 반환
 */

const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const pageNumbers = generatePagination(currentPage, totalPages)
    const prevDisabled = currentPage <= 1
    const nextDisabled = currentPage >= totalPages
    /**
     * @function createPageURL URL 생성 함수
     * @param pageNumber 페이지 번호
     * @returns 해당 페이지로 이동할 URL을 생성해 반환
     */
    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }
    const goToPreviousPage = () => {
        return createPageURL(Math.max(currentPage - 1, 1))
    }

    const goToNextPage = () => {
        return createPageURL(Math.min(currentPage + 1, totalPages))
    }

    return (
        <div className="flex flex-row justify-center items-center font-pretendard text-xxs text-GREY-80">
            <Link href={goToPreviousPage()}>
                <button disabled={prevDisabled} className={prevDisabled ? "opacity-50 cursor-not-allowed" : ""}>
                    &lt; 이전
                </button>
            </Link>
            <div className="flex flex-row justify-center items-center mx-4">
                {pageNumbers.map(page => (
                    <PaginationNumber
                        key={page}
                        href={createPageURL(page)}
                        page={page}
                        isActive={currentPage === page}
                    />
                ))}
            </div>
            <Link href={goToNextPage()}>
                <button disabled={nextDisabled} className={nextDisabled ? "opacity-50 cursor-not-allowed" : ""}>
                    다음 &gt;
                </button>
            </Link>
        </div>
    )
}

export default Pagination
/**
 * @function PaginationNumber 각 페이지 번호를 렌더링
 * @param page 렌더링할 페이지 번호
 * @param href 클릭 시 이동할 URL
 * @param isActive 현재 클릭된 페이지인지의 여부
 * @const className clsx를 사용하여 isActive 상태에 따라 CSS 클래스를 적용
 * @returns isActive 여부에 따라 해당 스타일이 적용된 숫자 버튼을 반환
 */

const PaginationNumber = ({ page, href, isActive }: PaginationNumberProps) => {
    const className = clsx("flex w-[25px] h-[25px] items-center justify-center mx-1.5", {
        "z-10 border-[1px] border-SYSTEM-black rounded-full text-SYSTEM-black cursor-pointer": isActive,
        "hover:cursor-pointer": !isActive,
    })
    return isActive ? (
        <div className={className}>{page}</div>
    ) : (
        <Link href={href} className={className}>
            {page}
        </Link>
    )
}
