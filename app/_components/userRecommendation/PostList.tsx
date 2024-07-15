import PostCard from "@/components/commons/postCard"
import RecommendPagination from "../recommendPagination"
import { PostListProps } from "./type"

const PostList = ({ currentPosts, currentPage, totalPages, onChangePage }: PostListProps) => {
    return (
        <div className="relative flex flex-row gap-20 pt-5 pb-40">
            <div className="absolute -top-10 right-0">
                <RecommendPagination currentPage={currentPage} totalPages={totalPages} onChangePage={onChangePage} />
            </div>
            {currentPosts.map(post => (
                <PostCard
                    key={post.postId}
                    post_id={post.postId}
                    title={post.title}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                    country={post.country}
                    user_nickname={post.author}
                    user_profile={""}
                    thumbnail={"/images/sampleThumbnail.svg"}
                    created_At={post.createdAt}
                />
            ))}
        </div>
    )
}

export default PostList
