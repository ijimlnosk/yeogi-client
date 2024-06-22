"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDeletePost } from "@/hook/usePostMutation"
import { usePostDataStore } from "@/libs/store"
import { useHandleClickProps } from "./type"
import { FloatingIcon } from "@/app/(afterLogin)/detailPost/[postId]/_components/floating/type"
import useHandleScroll from "@/hook/useHandleScroll"

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
    const { setPostId, setPostDetail } = usePostDataStore()

    useEffect(() => {
        if (scrollY <= 20) {
            setIsActiveState(prev => ({ ...prev, arrow: false }))
            setIconState(prevState =>
                prevState.map(icon => (icon.name === "arrow" ? { ...icon, isActive: false } : icon)),
            )
        }
    }, [scrollY, setIconState])

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

export default useFloatingBarHandler
