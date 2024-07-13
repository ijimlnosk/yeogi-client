import { getUserInfo } from "@/apis/userApi"
import { useEffect, useState } from "react"
import { User } from "../(afterLogin)/user/[userId]/_components/myMap/type"
import { Post } from "@/types/post"
import { getPost } from "@/apis/postApi"
import PostCard from "@/components/commons/postCard"
import { getCookieToken } from "@/apis/auth/storageUtils"
import RecommendPagination from "./recommendPagination"
import { useRecommendPagination } from "@/hook/useRecommendPagination"
import Image from "next/image"

const UserRecommendation = () => {
    const [userInfo, setUserInfo] = useState<User>()
    const [posts, setPosts] = useState<Post[]>([])
    const [isHovered, setIsHovered] = useState(false)
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
            <div className="w-full flex flex-row">
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
                <div
                    className="relative  ml-4 flex items-center cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Image
                        src={"/icons/gt-black.svg"}
                        alt="gt-black"
                        width={24}
                        height={24}
                        className={`${isHovered ? "opacity-0" : "opacity-100"}`}
                    />
                    <div
                        className={`absolute text-BRAND-50 left-0 ml-2 whitespace-nowrap overflow-hidden transition-all duration-100 ease-in-out flex flex-row ${
                            isHovered ? "w-20 opacity-100" : "w-0 opacity-0"
                        }`}
                    >
                        <p>모두보기</p>
                        <Image src={"/icons/gt-BRAND.svg"} alt="gt-BRAND" width={24} height={24} />
                    </div>
                </div>
            </div>

            <div className=" relative flex flex-row gap-20 pt-5 pb-40">
                <div className=" absolute -top-10 right-0">
                    <RecommendPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onChangePage={onChangePage}
                    />
                </div>
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
