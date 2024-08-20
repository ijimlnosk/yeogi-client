"use client"

import Image from "next/image"
import { useState } from "react"
import UserDialog from "./userDialog"
import { HeaderLoginProps } from "./type"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getUserInfo } from "@/apis/userApi"
import sampleProfile from "@/public/images/user/sampleProfile.svg"
import { useSession } from "next-auth/react"
import PostWriteBtn from "./postWriteBtn"

const HeaderLogin = ({ isShowHeader }: HeaderLoginProps) => {
    const [isProfileClicked, setIsProfileClicked] = useState<boolean>(false)
    const { status } = useSession()
    const { data, isLoading } = useQuery({
        queryKey: ["userInfo"],
        queryFn: getUserInfo,
        enabled: status === "authenticated",
    })
    const router = useRouter()

    return (
        <>
            {status === "authenticated" ? (
                <>
                    <div
                        onClick={() => setIsProfileClicked(prev => !prev)}
                        className="overflow-hidden rounded-full relative"
                    >
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
                            </div>
                        )}
                        <Image
                            src={data?.profile || sampleProfile}
                            alt="profile"
                            width={48}
                            height={48}
                            className={`rounded-full ${isProfileClicked ? "border-2 border-BRAND-50" : ""} cursor-pointer`}
                        />
                    </div>
                    <PostWriteBtn />
                </>
            ) : (
                <div className="min-w-12 min-h-[27px]">
                    <a href="/auth">로그인</a>
                </div>
            )}
            {isShowHeader && isProfileClicked && data && (
                <UserDialog userId={data.id} setIsProfileClicked={setIsProfileClicked} />
            )}
        </>
    )
}

export default HeaderLogin
