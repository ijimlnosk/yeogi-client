import { PostDetailProps } from "./type"
import PostDetailClient from "./_components/postDetailClient"

const DetailPostPage = async ({ params }: PostDetailProps) => {
    const { postId } = params
    try {
        let url = `/posts/${postId}`
        if (typeof window === "undefined") {
            // 서버 사이드에서 실행 중일 때
            url = `${process.env.NEXT_PUBLIC_BASE_URL}${url}`
        }
        const response = await fetch(url, {
            method: "GET",
        })

        const initialPost = await response.json()

        if (!initialPost)
            return (
                <div className="w-screen h-screen flex flex-col justify-center items-center">
                    <p className="text-[100px]">🫥</p>
                    <p className="text-xl text-BRAND-70">게시글 내용이 조금 기네요... 조금만 기다려주세요 </p>
                </div>
            )
        return <PostDetailClient postId={Number(postId)} initialPost={initialPost} />
    } catch (error) {
        console.error("Error fetching post:", error)
        throw error
    }
}
export default DetailPostPage
