"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useHandleClickProps } from "./type"
import { FloatingIcon } from "@/app/(afterLogin)/post/detail/[postId]/_components/floating/type"
import useHandleScroll from "@/hook/useHandleScroll"
import { useUpdatePostDataStore } from "@/libs/zustand/post"
import usePostLikeHandler from "@/hook/usePostLikeHandler"
import { useLoggedIn } from "@/libs/zustand/login"
import { useFetchDeletePost } from "@/libs/queryClient/postQueryClient"

const useFloatingBarHandler = ({ postId, post, setIconState }: useHandleClickProps) => {
    const { handleLikeClick, liked, isLoading } = usePostLikeHandler(postId!, post?.hasLiked || false, post!)
    const [isActiveState, setIsActiveState] = useState<{ [key: string]: boolean }>({
        arrow: false,
        like: liked,
        share: false,
        delete: false,
        update: false,
    })

    const router = useRouter()
    const scrollY = useHandleScroll()
    const deletePostMutation = useFetchDeletePost()
    const { setPostId, setPostDetail } = useUpdatePostDataStore()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [isInProgress, setIsInProgress] = useState<boolean>(false)
    const { userInfo } = useLoggedIn()

    if (postId === undefined) {
        throw new Error()
    }

    useEffect(() => {
        if (!isLoading && post?.likedMembersInfos && userInfo?.id) {
            const isLiked = post.likedMembersInfos.some(member => member.userId === userInfo.id)
            setIconState(prevState =>
                prevState.map(icon => (icon.name === "like" ? { ...icon, isActive: isLiked } : icon)),
            )
        } else {
            setIconState(prevState =>
                prevState.map(icon => (icon.name === "like" ? { ...icon, isActive: false } : icon)),
            )
        }
    }, [post?.likedMembersInfos, userInfo, isLoading])

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
            setIsInProgress(true)
        } else {
            setIsInProgress(false)
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

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true)
    }

    const handleDeletePost = async () => {
        if (postId) {
            try {
                await deletePostMutation.mutateAsync(Number(postId))
                router.push("/search")
            } finally {
                setIsDeleteModalOpen(false)
            }
        }
    }

    const handleUpdatePost = () => {
        if (post && postId) {
            if (post.memos.length > 0) {
                setIsInProgress(true)
            } else {
                setPostId(postId)
                setPostDetail(post)
                router.push(`/post/edit/${postId}`)
            }
        }
    }

    const handleClick = (iconName: string) => {
        setIconState((prevState: FloatingIcon[]) =>
            prevState.map((icon: FloatingIcon) => (icon.name === iconName ? { ...icon, isActive: true } : icon)),
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
                setIsActiveState(prev => ({ ...prev, update: true }))
                handleUpdatePost()
                break
            case "delete":
                handleDeleteClick()
                break
            default:
                break
        }
    }

    const handleModalClose = () => {
        setIsActiveState(prev => ({ ...prev, update: false }))
    }
    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false)
        setIconState(prevState => prevState.map(icon => (icon.name === "delete" ? { ...icon, isActive: false } : icon)))
    }

    return {
        isActiveState,
        isInProgress,
        handleClick,
        isDeleteModalOpen,
        handleModalClose,
        handleDeleteModalClose,
        handleDeletePost,
    }
}

export default useFloatingBarHandler
