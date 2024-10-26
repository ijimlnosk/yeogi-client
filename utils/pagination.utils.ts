import _ from "lodash"

/**
 *@function generatePagination 페이지네이션(숫자 버튼)을 생성하는 함수
 * @param currentPage 현재 페이지
 * @param totalPages 전체 페이지
 * @const itemsPerPage  각 그룹당 표시할 페이지 수(5)
 * @const currentGroup 현재 페이지가 속한 그룹을 계산
 * @const startPage 현재 그룹의 시작 페이지 번호
 * @const endPage 현재 그룹의 마지막 페이지 번호(전체 페이지 수를 넘지 않도록 Math.min을 사용하여 조정)
 * @returns startPage에서 endPage까지의 페이지 번호 배열을 생성해 반환
 */
export const generatePagination = (currentPage: number, totalPages: number) => {
    const itemsPerPage = 5
    const currentGroup = Math.ceil(currentPage / itemsPerPage)

    const startPage = (currentGroup - 1) * itemsPerPage + 1
    const endPage = Math.min(currentGroup * itemsPerPage, totalPages)

    return _.range(startPage, endPage + 1)
}

/**
 * @function hasNextGroup 다음 그룹이 있는지 확인하는 함수
 * @param currentPage 현재 페이지
 * @param totalPages 전체 페이지
 * @returns 현재 페이지가 전체 페이지 그룹 중 마지막 그룹이 아닌 경우 true를 반환
 */
export const hasNextGroup = (currentPage: number, totalPages: number) => {
    const itemsPerPage = 5
    return currentPage <= Math.floor(totalPages / itemsPerPage) * itemsPerPage
}

/**
 * @function hasPreviousGroup 이전 그룹이 있는지 확인하는 함수
 * @param currentPage 현재 페이지
 * @returns 현재 페이지가 첫 그룹(1~5)보다 큰 경우 true를 반환
 */
export const hasPreviousGroup = (currentPage: number) => {
    return currentPage > 5
}
