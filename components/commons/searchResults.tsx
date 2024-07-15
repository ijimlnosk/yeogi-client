import PostCard from "@/components/commons/postCard"
import TempImage from "@/public/images/sampleThumbnail.svg"
import { SearchResultsProps } from "./type"
import { formatISODateString } from "@/utils/date.utils"

const SearchResults = ({ posts }: SearchResultsProps) => {
    if (!posts || posts.length === 0) {
        return <div className="w-full h-[500px] flex justify-center items-center">관련 게시글이 없어요..🧐</div>
    }
    return (
        <div className="w-[400px] grid grid-cols-1 4xl:grid-cols-4 4xl:w-[1680px] 2xl:grid-cols-3 2xl:w-[1280px] lg:grid-cols-2 lg:w-[800px] gap-4 pt-6 pb-20">
            {posts.map(post => (
                <div key={post.postId} className="w-fit p-2">
                    <PostCard
                        key={post.postId}
                        post_id={post.postId}
                        user_profile={""}
                        thumbnail={TempImage}
                        title={post.title}
                        country={post.country}
                        user_nickname={post.author}
                        created_At={formatISODateString(post.createdAt)}
                        commentCount={0}
                        likeCount={post.likeCount}
                    />
                </div>
            ))}
        </div>
    )
}
export default SearchResults
