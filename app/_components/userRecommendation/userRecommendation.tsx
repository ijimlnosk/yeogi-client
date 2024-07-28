"use client"

import { getUserInfo } from "@/apis/userApi"
import { useEffect, useState } from "react"
import { Post } from "@/types/post"
import { getAccessToken } from "@/apis/auth/token/access.utils"
import { useRecommendPagination } from "@/hook/useRecommendPagination"
import PostList from "./PostList"
import { UserInfo } from "@/app/(afterLogin)/user/[userId]/_components/myMap/type"
import RecommendationHeader from "./recommendationHeader"
import { useGetFetchPost } from "@/libs/queryClient/postQueryClient"

const UserRecommendation = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>()
    const [posts, setPosts] = useState<Post[]>([])
    const postsPerPage = 4
    const getPostMutation = useGetFetchPost()

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
                    onSuccess: data => setPosts(data),
                },
            )
        }
        fetchUser()
    }, [])

    return (
        <div className=" w-full overflow-x-auto flex flex-col justify-center items-center">
            <div className="w-[1680px]  mt-24 px-4">
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
