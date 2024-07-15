/**
 * @function
 * @param {string} description - 전체 주소 설명
 * @returns
 *
 * @description - 주소의 나라 이름을 제거하는 함수
 */
export const removeCountryAddress = (description: string) => {
    const parts = description.split(" ")
    if (parts.length > 1) {
        parts.shift()
    }
    return parts.join(" ")
}
