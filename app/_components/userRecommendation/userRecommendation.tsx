"use clien"

import { getUserInfo } from "@/apis/userApi"
import { useEffect, useState } from "react"
import { Post } from "@/types/post"
import { getPost } from "@/apis/postApi"
import { getAccessToken } from "@/apis/auth/token/access.utils"
import { useRecommendPagination } from "@/hook/useRecommendPagination"
import PostList from "./PostList"
import { UserInfo } from "@/app/(afterLogin)/user/[userId]/_components/myMap/type"
import RecommendationHeader from "./recommendationHeader"

const UserRecommendation = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>()
    const [posts, setPosts] = useState<Post[]>([])
    const postsPerPage = 4

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

            const postResponse = await getPost({
                searchType: "CONTENT",
                sortCondition: "VIEWS",
                searchString: "",
            })
            setPosts(postResponse)
        }
        fetchUser()
    }, [])

    return (
        <div className="w-[480px] xl:w-[980px] 3xl:w-[1680px] mt-24">
            <RecommendationHeader userInfo={userInfo} getToken={getToken} />
            <PostList
                currentPosts={currentPosts}
                currentPage={currentPage}
                totalPages={totalPages}
                onChangePage={onChangePage}
            />
        </div>
    )
}

export default UserRecommendation
