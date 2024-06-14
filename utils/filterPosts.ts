/**
 * 주어진 게시글 배열과 검색어를 사용하여 검색 결과를 반환한다
 *
 * @param {Post[]} posts - 검색할 게시글 배열
 * @param {string} searchTerm - 검색어 문자열
 * @returns {Post[]} 필터링된 게시글 배열
 */

import { chosungIncludes } from "es-hangul"
import { Post } from "./type"

export const filterPosts = (posts: Post[], searchTerm: string) => {
    if (!searchTerm) return []

    const term = searchTerm.toLowerCase()

    return posts.filter(
        post =>
            chosungIncludes(post.title, term) ||
            chosungIncludes(post.nickName, term) ||
            chosungIncludes(post.content, term) ||
            chosungIncludes(post.continent, term) ||
            chosungIncludes(post.country, term) ||
            post.title.toLowerCase().includes(term) ||
            post.nickName.toLowerCase().includes(term) ||
            post.content.toLowerCase().includes(term) ||
            post.continent.toLowerCase().includes(term) ||
            post.country.toLowerCase().includes(term),
    )
}
