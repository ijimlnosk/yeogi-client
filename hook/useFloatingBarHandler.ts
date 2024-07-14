"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDeletePost } from "@/hook/usePostMutation"
import { usePostDataStore } from "@/libs/postStore"
import { useHandleClickProps } from "./type"
import { FloatingIcon } from "@/app/(afterLogin)/detailPost/[postId]/_components/floating/type"
import useHandleScroll from "@/hook/useHandleScroll"
import usePostLikeHandler from "./usePostLikeHandler"
import { useLoggedIn } from "@/libs/loginStore"

const useFloatingBarHandler = ({ postId, post, setIconState }: useHandleClickProps) => {
    const { handleLikeClick, liked, isLoading } = usePostLikeHandler(postId, post.hasLiked || false, post);
    const [isActiveState, setIsActiveState] = useState<{ [key: string]: boolean }>({
        arrow: false,
        like: liked,
        share: false,
        delete: false,
        update: false,
    })

    const router = useRouter()
    const scrollY = useHandleScroll()
    const deletePostMutation = useDeletePost()
    const { setPostId, setPostDetail } = usePostDataStore()
    const { userInfo } = useLoggedIn()
    const [isUpdateInProgress, setIsUpdateInProgress] = useState(false)

    if (postId === undefined) {
        throw new Error
    }

    useEffect(() => {
        if (!isLoading && post?.likedMembersInfos && userInfo?.id) {
            const isLiked = post.likedMembersInfos.some(member => member.userId === userInfo.id);
            setIconState(prevState =>
                prevState.map(icon => (icon.name === "like" ? { ...icon, isActive: isLiked } : icon))
            );
        } else {
            setIconState(prevState =>
                prevState.map(icon => (icon.name === "like" ? { ...icon, isActive: false } : icon))
            );
        }
    }, [post.likedMembersInfos, userInfo, isLoading]);

    useEffect(() => {
        if (scrollY <= 20) {
            setIsActiveState(prev => ({ ...prev, arrow: false }))
            setIconState(prevState =>
                prevState.map(icon => (icon.name === "arrow" ? { ...icon, isActive: false } : icon)),
            )
        }
    }, [scrollY, setIconState])

    useEffect(() => {
        if (isActiveState.update) {
            setIsUpdateInProgress(true)
        } else {
            setIsUpdateInProgress(false)
        }
    }, [isActiveState.update])

    const handleArrowClick = () => {
        setIsActiveState(prev => ({ ...prev, arrow: true }))
        setIconState(prevState => prevState.map(icon => (icon.name === "arrow" ? { ...icon, isActive: true } : icon)))
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleShareClick = async () => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href)
            setIsActiveState(prev => ({ ...prev, share: true }))
            setTimeout(() => {
                setIsActiveState(prev => ({ ...prev, share: false }))
                setIconState(prevState =>
                    prevState.map(icon => (icon.name === "share" ? { ...icon, isActive: false } : icon)),
                )
            }, 1000)
        }
    }

    const handleDeletePost = async () => {
        if (postId) {
            try {
                await deletePostMutation.mutateAsync(Number(postId))
                alert("🟢 게시글이 삭제되었어요!") // 성공 실패 모달 사용 예정
                router.push(`/`)
            } catch {
                alert("🔴 게시글 삭제에 실패했어요...") // 성공 실패 모달 사용 예정
            }
        }
    }

    const handleUpdatePost = () => {
        if (postId && post) {
            setPostId(postId)
            setPostDetail(post)
            router.push(`/updatePost/${postId}`)
        }
    }

    const handleClick = (iconName: string) => {
        setIconState((prevState: FloatingIcon[]) =>
            prevState.map((icon: FloatingIcon) =>
                icon.name === iconName ? { ...icon, isActive: !icon.isActive } : icon,
            ),
        )
        switch (iconName) {
            case "arrow":
                handleArrowClick()
                break
            case "like":
                handleLikeClick()
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

    const handleModalClose = () => {
        setIsActiveState(prev => ({ ...prev, update: false }))
    }

    return { isActiveState, handleClick, handleModalClose, isUpdateInProgress, isLoading }
}

export default useFloatingBarHandler
