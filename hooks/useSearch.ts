"use client"

import { useEffect, useState } from "react"
import { Post } from "./type"
import { chosungIncludes } from "es-hangul"

/**
 * 주어진 게시글 배열과 검색어를 사용하여 검색 결과를 반환한다
 *
 * @param {Post[]} posts - 검색할 게시글 배열
 * @param {string} searchTerm - 검색어 문자열
 * @returns {Post[]} 필터링된 게시글 배열
 */

const useSearch = (posts: Post[], searchTerm: string) => {
    const [results, setResults] = useState<Post[]>(posts)

    useEffect(() => {
        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            setResults(
                posts.filter(
                    post =>
                        chosungIncludes(post.title, term) ||
                        chosungIncludes(post.nickName, term) ||
                        chosungIncludes(post.title + post.content, term) ||
                        chosungIncludes(post.author, term) ||
                        chosungIncludes(post.country, term) ||
                        post.title.toLowerCase().includes(term) ||
                        post.nickName.toLowerCase().includes(term) ||
                        (post.title + post.content).toLowerCase().includes(term) ||
                        post.author.toLowerCase().includes(term) ||
                        post.country.toLowerCase().includes(term),
                ),
            )
        } else {
            setResults([])
        }
    }, [posts, searchTerm])
    return results
}

export default useSearch
