"use client"

import { useEffect, useState } from "react"
import { Post } from "./type"
import { chosungIncludes } from "es-hangul"

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
