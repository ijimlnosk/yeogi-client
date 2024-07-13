import { getUserInfo } from "@/apis/userApi"
import { useEffect, useState } from "react"
import { User } from "../(afterLogin)/user/[userId]/_components/myMap/type"
import { Post } from "@/types/post"
import { getPost } from "@/apis/postApi"
import PostCard from "@/components/commons/postCard"
import { getCookieToken } from "@/apis/auth/storageUtils"
import RecommendPagination from "./recommendPagination"
import { useRecommendPagination } from "@/hook/useRecommendPagination"

const UserRecommendation = () => {
    const [userInfo, setUserInfo] = useState<User>()
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

    const getToken = getCookieToken()

    useEffect(() => {
        const fetchUser = async () => {
            if (getToken) {
                const response = await getUserInfo()
                setUserInfo(response)
            }

            const postResponst = await getPost({
                searchType: "CONTENT",
                sortCondition: "VIEWS",
                searchString: "",
            })
            setPosts(postResponst)
        }
        fetchUser()
    }, [])

    return (
        <div className="w-[1680px] mt-24">
            <div>
                <p className="font-myeongjo text-xl">
                    {getToken ? (
                        <p>
                            <span className="  text-BRAND-50 ">{userInfo?.nickname}</span> 님을 위한 추천 기록
                        </p>
                    ) : (
                        <p>
                            <span className="  text-BRAND-50 ">현재 </span>추천 기록
                        </p>
                    )}
                </p>
            </div>
            <RecommendPagination currentPage={currentPage} totalPages={totalPages} onChangePage={onChangePage} />
            <div className="flex flex-row gap-20">
                {currentPosts.map(post => (
                    <PostCard
                        key={post.postId}
                        post_id={post.postId}
                        title={post.title}
                        likeCount={post.likeCount}
                        commentCount={post.commentCount}
                        continent={post.continent}
                        user_nickname={post.author}
                        user_profile={""}
                        thumbnail={"/images/sampleThumbnail.svg"}
                        created_At={post.createdAt}
                    />
                ))}
            </div>
        </div>
    )
}
export default UserRecommendation
