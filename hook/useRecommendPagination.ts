import { useState, useMemo } from "react"
import { UseRecommendPaginationProps, UseRecommendPaginationReturn } from "./type"

/**
 * 추천 항목 페이지네이션 커스텀 훅
 * @param {T[]} props.items - 페이지네이션 전체 배열
 * @param {number} props.itemsPerPage - 한 페이지당 표시할 항목 수
 * @param {number} props.initialPage - 초기 페이지 번호
 * @returns
 */
export const useRecommendPagination = <T>({
    items,
    itemsPerPage,
    initialPage = 1,
}: UseRecommendPaginationProps<T>): UseRecommendPaginationReturn<T> => {
    const [currentPage, setCurrentPage] = useState(initialPage)

    const paginatedData = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        return items.slice(indexOfFirstItem, indexOfLastItem)
    }, [items, currentPage, itemsPerPage])

    const totalPages = Math.ceil(items.length / itemsPerPage)

    const onChangePage = (direction: "prev" | "next") => {
        if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1)
        } else if (direction === "next" && currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    return {
        currentPage,
        setCurrentPage,
        currentItems: paginatedData,
        totalPages,
        onChangePage,
    }
}
