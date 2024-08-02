"use client"

import { getUserInfo } from "@/apis/userApi"
import { useEffect, useState } from "react"
import { Post } from "@/types/post"
import { getAccessToken } from "@/apis/auth/token/access.utils"
import { useRecommendPagination } from "@/hook/useRecommendPagination"
import PostList from "./PostList"
import { UserInfo } from "@/app/(afterLogin)/user/[userId]/_components/myMap/type"
import RecommendationHeader from "./recommendationHeader"
import { useFetchGetPost } from "@/libs/queryClient/postQueryClient"

const UserRecommendation = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [posts, setPosts] = useState<Post[]>([])
    const [error, setError] = useState<string | null>(null)
    const postsPerPage = 4
    const getPostMutation = useFetchGetPost()

    const {
        currentPage,
        currentItems: currentPosts,
        totalPages,
        onChangePage,
    } = useRecommendPagination({
        items: posts,
        itemsPerPage: postsPerPage,
    })

    const getToken = getAccessToken()

    useEffect(() => {
        const fetchUser = async () => {
            if (getToken) {
                const response = await getUserInfo()
                setUserInfo(response)
            }
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
                        } else {
                            console.error("Received data is not array: ", data)
                        }
                    },
                    onError: () => setError("Failed to fetch posts"),
                },
            )
        }
        fetchUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!userInfo) return <div>user info Loading...</div>

    return (
        <div className=" w-full h-[800px] overflow-x-auto flex flex-col justify-center items-center relative">
            <div className="w-[1680px] mt-24 px-4 absolute bottom-[90px] left-0 4xl:relative 4xl:items-center 4xl:bottom-[60px] ">
                <RecommendationHeader userInfo={userInfo} getToken={getToken} />
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
