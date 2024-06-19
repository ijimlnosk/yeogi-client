import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDeletePost } from "@/hook/usePostMutation"
import { usePostDataStore } from "@/libs/store"
import { useHandleClickProps } from "./type"

const useHandleClick = ({ postId, post }: useHandleClickProps) => {
    const [isActiveState, setIsActiveState] = useState<{ [key: string]: boolean }>({
        arrow: false,
        like: false,
        share: false,
        delete: false,
        update: false,
    })

    const router = useRouter()
    const deletePostMutation = useDeletePost()
    const { setPostId, setPostDetail } = usePostDataStore()

    const handleArrowClick = () => {
        setIsActiveState(prev => ({ ...prev, arrow: true }))
        window.scrollTo({ top: 0, behavior: "smooth" })
        setTimeout(() => {
            setIsActiveState(prev => ({ ...prev, arrow: false }))
        }, 500)
    }

    const handleShareClick = async () => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href)
            setIsActiveState(prev => ({ ...prev, share: true }))
            setTimeout(() => {
                setIsActiveState(prev => ({ ...prev, share: false }))
            }, 500)
        }
    }

    const handleDeletePost = async () => {
        if (postId) {
            try {
                await deletePostMutation.mutateAsync(Number(postId))
                alert("🟢 게시글이 삭제되었어요!") // 성공 실패 모달 사용 예정
            } catch {
                alert("🔴 게시글 삭제에 실패했어요...") // 성공 실패 모달 사용 예정
            }
        }
    }

    const handleUpdatePost = () => {
        if (postId && post) {
            setPostId(postId)
            setPostDetail(post)
            router.push(`/updatePost/freeForm/${postId}`)
        }
    }

    const handleClick = (iconName: string) => {
        switch (iconName) {
            case "arrow":
                handleArrowClick()
                break
            case "like":
                setIsActiveState(prev => ({ ...prev, like: !prev.like }))
                break
            case "share":
                handleShareClick()
                break
            case "update":
                handleUpdatePost()
                break
            case "delete":
                handleDeletePost()
                break
            default:
                break
        }
    }

    return { isActiveState, handleClick }
}

export default useHandleClick
