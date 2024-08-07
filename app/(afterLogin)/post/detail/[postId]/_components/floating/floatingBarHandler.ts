"use client"

import { useRouter } from "next/navigation"
import { useHandleClickProps } from "./type"
import { FloatingIcon } from "@/app/(afterLogin)/post/detail/[postId]/_components/floating/type"
import { useLoggedIn } from "@/libs/zustand/login"
import useScrollTopHandler from "@/hook/floating/useScrollTopHandler"
import useShareHandler from "@/hook/floating/useShareHandler"
import useDeleteHandler from "@/hook/floating/useDeleteHandler"
import useUpdateHandler from "@/hook/floating/useUpdateHandler"
import useIconStateHandler from "@/hook/floating/useIconStateHandler"

const useFloatingBarHandler = ({ postId, post, setIconState }: useHandleClickProps) => {
    const router = useRouter()
    const { isLoggedIn } = useLoggedIn()

    const { isScrollActive, handleScrollTopClick } = useScrollTopHandler({ setIconState })
    const { isShareActive, handleShareClick } = useShareHandler({ setIconState })
    const { isDeleteModalOpen, handleDeleteClick, handleDeletePost, handleDeleteModalClose } = useDeleteHandler(postId)
    const { isInProgress, handleUpdatePost, handleModalClose } = useUpdateHandler(postId, post!)
    const { handleLikeClick, liked } = useIconStateHandler({ postId, post, setIconState })

    const handleNewLikeClick = () => {
        handleLikeClick()
        setIconState(prevState => prevState.map(icon => (icon.name === "like" ? { ...icon, isActive: !liked } : icon)))
    }

    const handleClick = (iconName: string) => {
        if (iconName === "like" && !isLoggedIn) {
            alert("로그인 후 이용 가능합니다.")
            router.push("/auth")
        }
        setIconState((prevState: FloatingIcon[]) =>
            prevState.map((icon: FloatingIcon) => (icon.name === iconName ? { ...icon, isActive: true } : icon)),
        )
        switch (iconName) {
            case "arrow":
                handleScrollTopClick()
                break
            case "like":
                handleNewLikeClick()
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

    return {
        isScrollActive,
        isShareActive,
        isInProgress,
        handleClick,
        isDeleteModalOpen,
        handleModalClose,
        handleDeleteModalClose,
        handleDeletePost,
    }
}

export default useFloatingBarHandler
