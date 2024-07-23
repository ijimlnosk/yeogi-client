"use client"

import Image from "next/image"
import ProtectedLink from "@/components/commons/protectedLink"
import { useEffect, useState } from "react"
import { useLoggedIn } from "@/libs/zustand/login"
import UserDialog from "./userDialog"
import { HeaderLoginProps } from "./type"

const HeaderLogin = ({ isShowHeader }: HeaderLoginProps) => {
    const [profileImage, setProfileImage] = useState<string>("/images/sampleProfile.svg")
    const [isImageLoading, setIsImageLoading] = useState<boolean>(true)
    const [isProfileClicked, setIsProfileClicked] = useState<boolean>(false)
    const { isLoggedIn, userInfo } = useLoggedIn()

    useEffect(() => {
        if (userInfo) {
            setIsImageLoading(true)
            const image = getUserProfileImage()
            setProfileImage(image)
        }
    }, [userInfo])

    const getUserProfileImage = (): string => {
        if (userInfo?.profile) {
            return userInfo.profile
        }
        return "/images/user/sampleProfile.svg"
    }

    return (
        <>
            {isLoggedIn ? (
                <div
                    onClick={() => setIsProfileClicked(prev => !prev)}
                    className="overflow-hidden rounded-full relative"
                >
                    {isImageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
                        </div>
                    )}
                    {profileImage && (
                        <Image
                            src={profileImage}
                            alt="profile"
                            width={48}
                            height={48}
                            className={`rounded-full ${isImageLoading ? "invisible" : "visible"} ${isProfileClicked ? "border-2 border-BRAND-50" : ""} cursor-pointer`}
                            onLoadingComplete={() => setIsImageLoading(false)}
                        />
                    )}
                </div>
            ) : (
                <div className="min-w-12 min-h-[27px]">
                    <ProtectedLink href="/auth">로그인</ProtectedLink>
                </div>
            )}
            {isShowHeader && isProfileClicked && (
                <UserDialog userId={userInfo?.id} setIsProfileClicked={setIsProfileClicked} />
            )}
        </>
    )
}

export default HeaderLogin
