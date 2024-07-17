import PostCard from "@/components/commons/postCard"
import TempImage from "@/public/images/sampleThumbnail.svg"
import { MyPostProps } from "./type"
import { useQuery } from "@tanstack/react-query"
import { getMyPosts } from "@/apis/postApi"
import { useSearchParams } from "next/navigation"
import Pagination from "@/components/commons/pagination"

const MyPost = ({ userInfo }: MyPostProps) => {
    const currentDate = new Date().toISOString()
    const searchParams = useSearchParams()
    const ITEMS_PER_PAGE = 8

    const { data: myPosts, isLoading } = useQuery({
        queryKey: ["myPosts"],
        queryFn: getMyPosts,
    })

    const currentPage = Number(searchParams.get("page") || "1")
    const totalPages = myPosts ? Math.ceil(myPosts.length / ITEMS_PER_PAGE) : 0
    const paginateMyPosts = myPosts
        ? myPosts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
        : []

    if (isLoading) return <div>내 게시글 목록을 가져오는 중...📂</div>
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-[1680px] px-5 pb-5">
                <p className="font-semibold text-xl">
                    <span className="text-BRAND-50">{userInfo.nickname}</span>님의 기록
                </p>
            </div>
            <div className="w-[1680px] grid grid-cols-4 gap-4 pt-6 pb-20">
                {paginateMyPosts.map(post => (
                    <div key={post.postId} className="w-fit p-2">
                        <PostCard
                            key={post.postId}
                            post_id={post.postId}
                            user_nickname={post.author}
                            user_profile={`${userInfo.profile}`}
                            thumbnail={TempImage}
                            title={post.title}
                            country={post.country}
                            created_At={currentDate}
                            commentCount={0}
                            likeCount={post.likeCount}
                        />
                    </div>
                ))}
            </div>
            {paginateMyPosts.length > 0 && (
                <div className="mb-20">
                    <Pagination totalPages={totalPages} currentPage={currentPage} />
                </div>
            )}
        </div>
    )
}
export default MyPost
