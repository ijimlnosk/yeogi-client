import PostCard from "@/components/commons/postCard"
import TempImage from "@/public/images/sampleThumbnail.svg"
import { SearchResultsProps } from "./type"
import { formatISODateString } from "@/app/(afterLogin)/detailPost/[postId]/date.utils"

const SearchResults = ({ posts }: SearchResultsProps) => {
    if (!posts || posts.length === 0) {
        return <div>관련 게시글이 없어요..🧐</div>
    }
    return (
        <div className="w-[1680px] grid grid-cols-4 gap-4 pt-6 pb-20">
            {posts.map(post => (
                <div key={post.postId} className="w-fit p-2">
                    <PostCard
                        key={post.postId}
                        post_id={post.postId}
                        user_profile={""}
                        thumbnail={TempImage}
                        title={post.title}
                        continent={post.continent}
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
