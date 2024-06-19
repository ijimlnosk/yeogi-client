import arrowIcon from "@/public/icons/arrow_up.svg"
import likeIcon from "@/public/icons/floatinglike.svg"
import shareIcon from "@/public/icons/share.svg"
import editIcon from "@/public/icons/edit.svg"
import deleteIcon from "@/public/icons/trash.svg"

export const defaultIcons = [
    { name: "arrow", icon: arrowIcon, isActive: false },
    { name: "like", icon: likeIcon, isActive: false },
    { name: "share", icon: shareIcon, isActive: false },
]

export const handlePostIcons = [
    { name: "update", icon: editIcon, isActive: false },
    { name: "delete", icon: deleteIcon, isActive: false },
]
