import { useCommentIdStore, useIsUpdateComment } from "@/libs/commentStore"
import useModalStore from "@/libs/modalStore"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { CommentMenuProps } from "./type"

const CommentMenu = ({ commentId }: CommentMenuProps) => {
    const [isMenu, setIsMenu] = useState(false)
    const { setIsUpdateComment } = useIsUpdateComment()
    const { setIsDelete } = useModalStore()
    const { setSaveCommentId } = useCommentIdStore()
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOut = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOut)

        return () => {
            document.removeEventListener("mousedown", handleClickOut)
        }
    }, [menuRef])

    const handleUpdateClick = () => {
        setIsUpdateComment(true)
        setSaveCommentId(commentId)
        setIsMenu(false)
    }

    const handleDeleteClick = (commentId: number) => {
        setIsDelete(true)
        setSaveCommentId(commentId)
    }

    return (
        <div ref={menuRef} className="relative">
            <Image
                src={"/icons/menu.svg"}
                alt="menu"
                width={24}
                height={24}
                onClick={() => setIsMenu(true)}
                className="hover:cursor-pointer"
            />
            <div>
                {isMenu && (
                    <div>
                        <div className="w-[108px] h-[85px] bg-SYSTEM-white absolute right-0 top-0 shadow-polaroid flex flex-col items-center justify-center gap-2">
                            <div onClick={() => handleUpdateClick()} className="hover:cursor-pointer">
                                수정
                            </div>
                            <div className="border-t-2 border-GREY-20 w-[60px] h-[1px]"></div>
                            <div onClick={() => handleDeleteClick(commentId)} className="hover:cursor-pointer">
                                삭제
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentMenu
