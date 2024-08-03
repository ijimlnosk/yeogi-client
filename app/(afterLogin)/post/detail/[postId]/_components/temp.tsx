import CommentSection from "./section/commentSection"
import PostDetailSection from "./section/detailSection"
import FloatingSection from "./section/floatingSection"
import { Post } from "@/types/post"
import DeleteModal from "@/components/commons/deleteModal"
import useFloatingBarHandler from "./floating/floatingBarHandler"
import { useFloatingIconState } from "@/libs/zustand/floating"

export type TempComponentProps = {
    post: Post
    postId: number
    isMine: boolean
}

const TempComponent = ({ post, postId, isMine }: TempComponentProps) => {
    const { setIconState } = useFloatingIconState()

    const { isDeleteModalOpen, handleDeletePost, handleDeleteModalClose } = useFloatingBarHandler({
        postId: postId,
        post: post,
        setIconState: setIconState,
    })

    console.log(post, "post")
    console.log(postId, "postId")

    return (
        <>
            <DeleteModal
                title="게시글"
                context="삭제된 데이터"
                isOpen={isDeleteModalOpen}
                onClick={handleDeletePost}
                onLeftClick={handleDeleteModalClose}
            />
            <FloatingSection postId={postId} post={post} isMine={isMine} />
            <PostDetailSection post={post} />
            <CommentSection postId={postId} post={post} />
        </>
    )
}

export default TempComponent
