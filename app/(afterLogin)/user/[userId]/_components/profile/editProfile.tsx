"use client"

import { useRef, ChangeEvent, useState } from "react"
import photoIcon from "@/public/icons/photoIcon.svg"
import EditField from "./editField"
import { EditProfileProps } from "./type"
import ProfileImage from "./profileImage"
import { UserInfoProps } from "@/components/layouts/type"
import DefaultBanner from "@/public/images/user/defaultBanner.svg"

const EditProfile = ({ userInfo, setUserInfo, onCancel }: EditProfileProps) => {
    const [, setName] = useState(userInfo.nickname)
    const [, setMotto] = useState(userInfo.motto)
    const [, setProfileImage] = useState(userInfo.profile || userInfo.profile_image)
    const [, setBgImage] = useState(userInfo.banner || DefaultBanner)
    const bgImageInputRef = useRef<HTMLInputElement>(null)

    // 공통된 이미지 업데이트 함수
    const updateImage = (e: ChangeEvent<HTMLInputElement>, setImage: (image: string) => void) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target && event.target.result) {
                    setImage(event.target.result.toString())
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    // 프로필 이미지 변경 핸들러
    const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateImage(e, setProfileImage)
    }

    // 배경 이미지 변경 핸들러
    const handleBgImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateImage(e, setBgImage)
    }

    const submitEditedUserInfo = (updatedProfile: UserInfoProps) => {
        setUserInfo(updatedProfile)
    }

    return (
        <div>
            <div className="relative">
                <img
                    src={userInfo.banner ? userInfo.banner : ""}
                    alt="Background"
                    className="w-full h-[440px] object-cover"
                />
                <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                    onClick={() => bgImageInputRef.current?.click()}
                >
                    <img src={photoIcon.src} alt="Change Background" className="w-10 h-10" />
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
                        onChange={e => setName(e.target.value)}
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
                    onClick={() => submitEditedUserInfo}
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
