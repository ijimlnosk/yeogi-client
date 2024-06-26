import PostCard from "@/components/commons/postCard"
import TempImage from "@/public/images/sampleThumbnail.svg"
import { Post } from "@/utils/type"
import SampleProfile from "@/public/images/sampleProfile.svg"

const MyPost = ({ posts }: { posts?: Post[] }) => {
    const currentDate = new Date().toISOString()

    if (posts && posts.length > 0)
        return (
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-[1680px] px-5 pb-5">
                    <p className="font-semibold text-xl">
                        <span className="text-BRAND-50">Kimi</span>님의 기록
                    </p>
                </div>
                <div className="w-[1680px] grid grid-cols-4 gap-4 pt-6 pb-20">
                    {posts.map(post => (
                        <div key={post.postId} className="w-fit p-2">
                            <PostCard
                                key={post.postId}
                                post_id={post.postId}
                                user_profile={SampleProfile}
                                thumbnail={TempImage}
                                title={post.title}
                                continent={post.continent}
                                user_nickname={post.author}
                                created_At={currentDate}
                                commentCount={0}
                                likeCount={post.likeCount}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
}
export default MyPost
