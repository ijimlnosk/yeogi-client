import PostCard from "@/components/commons/postCard"
import TempImage from "@/public/images/sampleThumbnail.svg"
import { Post } from "@/utils/type"

const SearchResults = ({ posts }: { posts: Post[] }) => {
    if (posts && posts.length > 0)
        return (
            <div className="w-[1680px] grid grid-cols-4 gap-4 pt-6 pb-20">
                {posts.map(post => (
                    <div key={post.postId} className="w-fit p-2">
                        <PostCard
                            key={post.postId}
                            post_id={post.postId}
                            user_profile={post.userProfile}
                            thumbnail={TempImage}
                            title={post.title}
                            continent={post.continent}
                            user_nickname={post.nickName}
                            created_At={new Date(post.createdAt)}
                            commentCount={post.commentCount}
                            likeCount={post.likeCount}
                        />
                    </div>
                ))}
            </div>
        )
}
export default SearchResults
