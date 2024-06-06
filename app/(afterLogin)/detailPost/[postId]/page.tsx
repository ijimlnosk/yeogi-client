"use client"

import { useEffect, useState } from "react"
import CommentBox from "./_components/commentBox"
import CreateComment from "./_components/createComment"
import FreeFormDetail from "./_components/freeFormDetail"
import { CommentType, ReCommentType } from "./type"
import LikeToComment from "./_components/likeToComment"
import { useSearchParams } from "next/navigation"
import { Pagination } from "@/components/commons/pagination"
import Link from "next/link"

const DetailPostPage = () => {
    const [comments, setComments] = useState<CommentType[]>([]) // 임시 데이터
    const [reComments, setReComments] = useState<ReCommentType[]>([])
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get("page")) || 1
    const commentsPerPage = 5

    useEffect(() => {
        // 실제 데이터 패칭
        setComments([
            {
                id: 1,
                content: "첫 번째 댓글의 내용이 여기에 표시됩니다.",
                likes: 10,
                comments: 5,
                date: "2024.06.06",
                userId: "Gang",
                userProfileImage: "",
            },
            {
                id: 2,
                content:
                    "두 번째 댓글의 내용이 여기에 표시됩니다. 이 댓글은 50자를 넘을 때 줄 바꿈이 이루어져야 합니다.",
                likes: 20,
                comments: 2,
                date: "2024.06.07",
                userId: "Amy",
                userProfileImage: "",
            },
        ])
        setReComments([
            {
                id: 1,
                content: "첫 번째 댓글에 대한 리댓입니다.",
                likes: 1,
                date: "2024.06.07",
                userId: "kimi",
                userProfileImage: "",
                parentId: 1,
            },
            {
                id: 1,
                content: "두 번째 댓글에 대한 리댓입니다.",
                likes: 1,
                date: "2024.06.07",
                userId: "wendy",
                userProfileImage: "",
                parentId: 2,
            },
        ])
    }, [])

    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <FreeFormDetail
                    title="인생 첫 혼자 유럽 일주"
                    content="What is Lorem Ipsum?
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            Why do we use it?
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                            Where does it come from?
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.
                            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
                    author="Gang"
                    created_At="2024. 06. 06"
                    destination="유럽"
                    travel_range="2024. 07. 01 ~ 2024. 07. 04"
                />
            </div>
            <div className="flex justify-center items-center pt-[50px]">
                <CreateComment />
            </div>
            <div className="w-full flex items-center justify-center">
                <LikeToComment likes={10} comments={4} />
            </div>
            <div className="flex items-center justify-center">
                <CommentBox
                    comments={comments}
                    reComments={reComments}
                    currentPage={currentPage}
                    commentPerPage={commentsPerPage}
                />
            </div>
            <div className="flex justify-center items-center pt-[20px]">
                <Pagination totalPages={Math.ceil(comments.length / commentsPerPage)} />
            </div>

            <div className="w-full flex justify-center items-center pt-[50px] pb-[100px]">
                <div className="w-[1000px] flex justify-end  ">
                    <Link
                        href={"/search"}
                        className="bg-BRAND-50 text-SYSTEM-white text-md w-[110px] h-[48px] flex items-center justify-center rounded-lg "
                    >
                        목록으로
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default DetailPostPage
