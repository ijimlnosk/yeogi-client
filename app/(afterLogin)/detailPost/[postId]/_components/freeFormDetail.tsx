import Button from "@/components/commons/button"
import { PostDetailProps } from "./type"
import { useDeletePost } from "@/hook/usePostMutation"

const FreeFormDetail = ({ title, content, author, created_At, destination, travel_range }: PostDetailProps) => {
    const deletePostMutation = useDeletePost()
    const postId = window.location.pathname.split("/").pop()

    const handleDeletePost = async (postId: string | undefined) => {
        if (!postId) throw new Error("Invalid postId")

        try {
            await deletePostMutation.mutateAsync(parseInt(postId))
            alert("🟢 게시글 삭제 성공")
            window.location.href = "/"
        } catch (error) {
            console.error("Error deleting post:", error)
            throw new Error("🔴 게시글 삭제 실패")
        }
    }

    return (
        <div className="w-[1000px] bg-comment-pattern bg-SYSTEM-white h-auto flex items-center justify-center flex-col border-2 border-GREY-50 rounded-2xl py-5">
            <div className="w-[960px] border-2 border-GREY-30 rounded-2xl p-5 ">
                <div className="w-full flex justify-between border-t-2 border-b-2 p-2 border-GREY-30">
                    <p>
                        게시일 : <span className="font-bold">{created_At}</span>
                    </p>
                    <p>
                        작성자 : <span className="text-BRAND-50">{author}</span>
                    </p>
                </div>
                <div className="pt-[20px]">
                    <div className="flex items-center justify-center py-5 border-t-2 border-b-2 border-BRAND-50">
                        <p className="text-xxl">{title}</p>
                    </div>
                    <div className="mt-[10px] py-2.5 flex flex-row justify-between items-center  border-t-2 border-GREY-30">
                        <div className="w-[143px]">
                            <p className="flex justify-between">
                                여행지 <span className="text-BRAND-50 font-bold">{destination}</span>
                            </p>
                        </div>
                        <div className="w-[282px]">
                            <p className="flex justify-between">
                                여행일자 <span className="text-BRAND-50 font-bold">{travel_range}</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end">
                        <Button className="w-[60px] mx-2" rounded="lg" background="brand50" textColor="white">
                            수정
                        </Button>
                        <Button
                            onClick={() => handleDeletePost(postId)}
                            className="w-[60px] ml-2"
                            rounded="lg"
                            background="brand50"
                            textColor="white"
                        >
                            삭제
                        </Button>
                    </div>
                    {content && <div dangerouslySetInnerHTML={{ __html: content }} className="py-5" />}
                </div>
            </div>
        </div>
    )
}

export default FreeFormDetail
