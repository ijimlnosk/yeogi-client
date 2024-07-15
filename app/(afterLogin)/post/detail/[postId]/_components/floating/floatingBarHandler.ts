"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useHandleClickProps } from "./type"
import { FloatingIcon } from "@/app/(afterLogin)/post/detail/[postId]/_components/floating/type"
import useHandleScroll from "@/hook/useHandleScroll"
import { useDeletePost } from "@/libs/reactQuery/usePostMutation"
import { useUpdatePostDataStore } from "@/libs/zustand/post"

const useFloatingBarHandler = ({ postId, post, setIconState }: useHandleClickProps) => {
    const [isActiveState, setIsActiveState] = useState<{ [key: string]: boolean }>({
        arrow: false,
        like: false,
        share: false,
        delete: false,
        update: false,
    })

    const router = useRouter()
    const scrollY = useHandleScroll()
    const deletePostMutation = useDeletePost()
    const { setPostId, setPostDetail } = useUpdatePostDataStore()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [isInProgress, setIsInProgress] = useState<boolean>(false)

    useEffect(() => {
        if (scrollY <= 20) {
            setIsActiveState(prev => ({ ...prev, arrow: false }))
            setIconState(prevState =>
                prevState.map(icon => (icon.name === "arrow" ? { ...icon, isActive: false } : icon)),
            )
        }
    }, [scrollY, setIconState])

    // 수정 중을 띄우기 위한 useEffect
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
            setIsActiveState(prev => {
                const newState = { ...prev, share: true }
                return newState
            })
            setTimeout(() => {
                setIsActiveState(prev => {
                    const newState = { ...prev, share: false }
                    return newState
                })
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
                router.back()
            } catch {
                console.log("게시글 삭제를 취소했어요.")
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
                setIsActiveState(prev => ({ ...prev, like: !prev.like }))
                break
            case "share":
                handleShareClick()
                break
            case "update":
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
