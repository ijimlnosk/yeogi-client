"use client"

import Image from "next/image"
import ProtectedLink from "@/components/commons/protectedLink"
import { useEffect, useState } from "react"
import { useLoggedIn } from "@/libs/zustand/login"
import UserDialog from "./userDialog"
import { HeaderLoginProps } from "./type"
import { useRouter } from "next/navigation"
import Button from "@/components/commons/button"

const HeaderLogin = ({ isShowHeader }: HeaderLoginProps) => {
    const [profileImage, setProfileImage] = useState<string>("/images/user/sampleProfile.svg")
    const [isImageLoading, setIsImageLoading] = useState<boolean>(true)
    const [isProfileClicked, setIsProfileClicked] = useState<boolean>(false)
    const { isLoggedIn, userInfo } = useLoggedIn()
    const router = useRouter()

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
                <>
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
                    <Button
                        background="black"
                        textColor="white"
                        onClick={() => router.push("/post/create")}
                        className="md:w-[120px] md:h-[46px] w-[46px] h-[46px] rounded-full flex items-center justify-center md:px-5 md:py-[13px]"
                    >
                        <Image
                            src={"/icons/write.svg"}
                            width={24}
                            height={24}
                            alt="게시글 작성하기"
                            className="w-6 h-6 md:mr-2 mr-0"
                        />
                        <span className="hidden md:inline md:whitespace-nowrap md:visible invisible">글쓰기</span>
                    </Button>
                </>
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
