"use Client"

import Link from "next/link"
import Image from "next/image"
import ProtectedLink from "@/components/protectedLink"
import { HeaderLoginProps } from "./type"
import { useEffect, useState } from "react"

const HeaderLogin = ({ isLoggedIn, userInfo }: HeaderLoginProps) => {
    const [profileImage, setProfileImage] = useState<string>("")

    console.log("isLoggedIn:", isLoggedIn)
    console.log("userInfo:", userInfo)
    const getUserProfileImage = (): string => {
        if (userInfo?.profile) {
            return userInfo.profile
        }
        if (userInfo?.profile_image) {
            return userInfo.profile_image
        }
        return "/images/sampleProfile.svg"
    }
    useEffect(() => {
        if (userInfo) {
            setProfileImage(getUserProfileImage())
        }
    }, [userInfo])
    return (
        <>
            {isLoggedIn ? (
                <Link href={`/user/${userInfo?.id}`}>
                    {userInfo?.profile || userInfo?.profile_image ? (
                        <Image
                            src={getUserProfileImage()}
                            alt="profile"
                            width={48}
                            height={48}
                            className="rounded-full"
                        />
                    ) : (
                        <div>
                            <Image
                                src={"/images/sampleProfile.svg"}
                                alt="Profile"
                                width={48}
                                height={48}
                                className="rounded-full"
                            />
                        </div>
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
