"use client"

import { useEffect, useState } from "react"
import { Post } from "@/types/post"
import { useRecommendPagination } from "@/hook/useRecommendPagination"
import PostList from "./PostList"
import RecommendationHeader from "./recommendationHeader"
import { useFetchGetPost } from "@/libs/queryClient/postQueryClient"
import { useLoggedIn } from "@/libs/zustand/login"

const UserRecommendation = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [, setError] = useState<string | null>(null)
    const postsPerPage = 4
    const getPostMutation = useFetchGetPost()
    const { userInfo } = useLoggedIn()

    const {
        currentPage,
        currentItems: currentPosts,
        totalPages,
        onChangePage,
    } = useRecommendPagination({
        items: posts,
        itemsPerPage: postsPerPage,
    })

    useEffect(() => {
        getPostMutation.mutate(
            {
                searchType: "CONTENT",
                sortCondition: "VIEWS",
                searchString: "",
            },
            {
                onSuccess: data => {
                    if (Array.isArray(data)) {
                        setPosts(data)
                    }
                },
                onError: () => setError("Failed to fetch posts"),
            },
        )
    }, [])

    return (
        <div className=" w-full h-[800px] overflow-x-auto flex flex-col justify-center items-center relative">
            <div className="w-[1680px] mt-24 px-4 absolute bottom-[90px] left-0 4xl:relative 4xl:items-center 4xl:bottom-[60px] ">
                <RecommendationHeader userInfo={userInfo} />
                <PostList
                    currentPosts={currentPosts}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onChangePage={onChangePage}
                />
            </div>
        </div>
    )
}

export default UserRecommendation
