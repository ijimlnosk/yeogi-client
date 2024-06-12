import PostCard from "@/components/commons/postCard"
import { Post } from "@/hooks/type"
import TempImage from "@/public/images/sampleThumbnail.svg"

const SearchResults = ({ posts }: { posts: Post[] }) => {
    if (posts.length > 0)
        return (
            <div className="flex flex-row flex-wrap gap-4 py-20">
                {posts.map(post => (
                    <div key={post.postId} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
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
