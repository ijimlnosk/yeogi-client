"use client"

import Link from "next/link"
import Image from "next/image"
import ProtectedLink from "@/components/commons/protectedLink"
import { useEffect, useState } from "react"
import { useLoggedIn } from "@/libs/zustand/login"

const HeaderLogin = () => {
    const [profileImage, setProfileImage] = useState<string>("/images/sampleProfile.svg")
    const [isImageLoading, setIsImageLoading] = useState(true)
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
        if (userInfo?.profile_image) {
            return userInfo.profile_image
        }
        return "/images/sampleProfile.svg"
    }

    const handleImageLoad = () => {
        setIsImageLoading(false)
    }

    return (
        <>
            {isLoggedIn ? (
                <Link href={`/user/${userInfo?.id}`} className="w-12 h-12 overflow-hidden rounded-full relative ">
                    {isImageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                        </div>
                    )}
                    {profileImage && (
                        <Image
                            src={profileImage}
                            alt="profile"
                            width={48}
                            height={48}
                            className={`rounded-full ${isImageLoading ? "invisible" : "visible"}`}
                            onLoadingComplete={handleImageLoad}
                        />
                    )}
                </Link>
            ) : (
                <div className="min-w-12 min-h-[27px]">
                    <ProtectedLink href="/auth">로그인</ProtectedLink>
                </div>
            )}
        </>
    )
}

export default HeaderLogin
