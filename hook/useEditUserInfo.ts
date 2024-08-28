import { EditUserInfoType, MyUserInfoType } from "@/types/user"
import { useState } from "react"
import DefaultBanner from "@/public/images/user/defaultBanner.svg"
import DefaultProfile from "@/public/images/user/sampleProfile.svg"

export const useEditedUserInfo = (userInfo: MyUserInfoType) => {
    const [editedUserInfo, setEditedUserInfo] = useState<EditUserInfoType>({
        ...userInfo,
        profile: userInfo.profile || DefaultProfile,
        banner: userInfo.banner || DefaultBanner,
        nickname: userInfo.nickname || "",
        motto: userInfo.motto || "",
        first: false,
    })

    // change nickname or motto
    const handleFieldChange =
        (field: "nickname" | "motto") => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setEditedUserInfo(prev => ({ ...prev, [field]: e.target.value || "" }))
        }

    return { editedUserInfo, setEditedUserInfo, handleFieldChange }
}
