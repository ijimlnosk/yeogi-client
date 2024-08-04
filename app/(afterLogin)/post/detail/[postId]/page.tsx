import { PostDetailProps } from "./type"
import PostDetailClient from "./_components/postDetailClient"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { queryClient } from "@/libs/queryClient/postQueryClient"

/* 
params ?

① next.js의 동적 라우팅 시스템에서 자동으로 제공되는 객체로 st
② 이는 페이지 컴포넌트에 props로 전달 → params는 URL의 동적 세그먼트에서 추출
③ 파일 이름이나 폴더 이름에 대괄호로 둘러싸인 부분 === 동적 세그먼트
④ params는 string
*/
const DetailPostPage = async ({ params }: PostDetailProps) => {
    const { postId } = params

    /*
     * 실제 postId 값만 가져오기 위해서 numbericPostId 사용
     *
     * console.log("postId", postId) → { postId: 'posts144' }
     *
     * postId가 위와 같이 찍히는 이유
     * 현재 proxy 설정으로 BASE_URL 뒤에 posts가 붙어있기 때문 (next.config.mjs 파일에서 확인 가능)
     */
    const numericPostId = parseInt(String(postId).replace(/\D/g, ""), 10)

    try {
        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <PostDetailClient postId={Number(numericPostId)} />
            </HydrationBoundary>
        )
    } catch {
        return (
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <p className="text-[100px]">🫥</p>
                <p className="text-xl text-BRAND-70">게시글 내용이 조금 기네요... 조금만 기다려주세요 </p>
            </div>
        )
    }
}
export default DetailPostPage
