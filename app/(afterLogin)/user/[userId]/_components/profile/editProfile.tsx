"use client"

import { useRef, ChangeEvent, useState } from "react"
import photoIcon from "@/public/icons/photoIcon.svg"
import EditField from "./editField"
import { EditProfileProps } from "./type"
import ProfileImage from "./profileImage"
import DefaultBanner from "@/public/images/user/defaultBanner.svg"
import Image from "next/image"
import { resizeAndSetImage } from "@/utils/setImage.utils"
import {
    useUpdateUserBannerImage,
    useUpdateUserInfo,
    useUpdateUserProfileImage,
} from "@/libs/reactQuery/useUserMutation"
import { UserInfoType } from "@/types/user"

const EditProfile = ({ userInfo, onCancel }: EditProfileProps) => {
    const [nickname, setNickname] = useState<string>(userInfo.nickname)
    const [motto, setMotto] = useState<string>(userInfo.motto)
    const [, setProfileImage] = useState<string>(userInfo.profile || userInfo.profile_image || "")
    const [, setBgImage] = useState<string>(userInfo.banner || DefaultBanner)
    const bgImageInputRef = useRef<HTMLInputElement>(null)

    const updateUserInfo = useUpdateUserInfo()
    const updateUserProfileImage = useUpdateUserProfileImage()
    const updateUserBannerImage = useUpdateUserBannerImage()

    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement>,
        setImage: React.Dispatch<React.SetStateAction<string>>,
        mutateFn: (params: { userInfo: UserInfoType; image: string }) => void,
    ) => {
        resizeAndSetImage(e, setImage)
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target && event.target.result) {
                    const base64Str = event.target.result.toString()
                    mutateFn({ userInfo, image: base64Str })
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleImageChange(e, setProfileImage, ({ userInfo, image }) =>
            updateUserProfileImage.mutate({ userInfo, profileImage: image }),
        )
    }

    const handleBgImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleImageChange(e, setBgImage, ({ userInfo, image }) =>
            updateUserBannerImage.mutate({ userInfo, bannerImage: image }),
        )
    }

    const handleSave = () => {
        const editedUserInfo: UserInfoType = { ...userInfo, nickname, motto }
        updateUserInfo.mutate({ userInfo, editedUserInfo })
    }

    return (
        <div className="relative">
            <div className="relative">
                <Image
                    width={1920}
                    height={440}
                    src={userInfo.banner ? userInfo.banner : DefaultBanner}
                    alt="banner image"
                    className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-60" />
                <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                    onClick={() => bgImageInputRef.current?.click()}
                >
                    <Image width={40} height={40} src={photoIcon.src} alt="can change banner image" />
                </div>
                <input type="file" ref={bgImageInputRef} className="hidden" onChange={handleBgImageChange} />
            </div>
            <div className="absolute left-[120px] top-[360px] flex items-center">
                <ProfileImage
                    image={`${userInfo.profile}` || `${userInfo.profile_image}`}
                    onImageChange={handleProfileImageChange}
                />
                <div className="ml-12 mt-36">
                    <EditField
                        value={userInfo.nickname}
                        onChange={e => setNickname(e.target.value)}
                        type="input"
                        maxLength={10}
                        className="mb-4 text-4xl font-semibold w-fit"
                    />
                    <EditField
                        value={userInfo.motto}
                        onChange={e => setMotto(e.target.value)}
                        type="input"
                        maxLength={40}
                        className="text-lg w-fit"
                    />
                </div>
            </div>
            <div className="absolute top-[60px] right-[120px] flex space-x-2 z-20">
                <button
                    className="bg-SYSTEM-black text-SYSTEM-white py-2 px-4 rounded-xl text-md font-medium"
                    onClick={handleSave}
                >
                    프로필 저장
                </button>
                <button className="bg-GREY-50 text-white py-2 px-4 rounded-xl text-md font-medium" onClick={onCancel}>
                    취소
                </button>
            </div>
        </div>
    )
}

export default EditProfile
