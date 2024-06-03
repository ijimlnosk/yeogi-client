export const generatePagination = (currentPage: number, totalPages: number) => {
    const itemsPerPage = 5 // 한 페이지네이션에서 보일 숫자 버튼의 개수
    const currentGroup = Math.ceil(currentPage / itemsPerPage)

    const startPage = (currentGroup - 1) * itemsPerPage + 1
    const endPage = Math.min(currentGroup * itemsPerPage, totalPages)

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
}

export const hasNextGroup = (currentPage: number, totalPages: number) => {
    const itemsPerPage = 5
    return currentPage <= Math.floor(totalPages / itemsPerPage) * itemsPerPage
}

export const hasPreviousGroup = (currentPage: number) => {
    return currentPage > 5
}
