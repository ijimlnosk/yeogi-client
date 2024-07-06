"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import ProtectedLink from "../protectedLink"
import { getCookieToken } from "@/apis/auth/storageUtils"
import { getUserInfo } from "@/apis/userApi"
import { UserInfoProps } from "./type"
import HeaderSearchBar from "./_components/headerSearch"
import HeaderLogin from "./_components/headerLogin"
import HeaderNavigate from "./_components/headerNavigate"
import { useRouter } from "next/navigation"

const Header = () => {
    const [isShowHeader, setIsShowHeader] = useState<boolean>(true)
    const [lastScrollY, setLastScrollY] = useState<number>(0)
    const [isSearchBarClicked, setIsSearchBarClicked] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<UserInfoProps | undefined>()

    const router = useRouter()
    const handleScroll = () => {
        if (typeof window !== "undefined") {
            if (window.scrollY > lastScrollY) {
                setIsSearchBarClicked(false)
                setIsShowHeader(false)
            } else {
                setIsShowHeader(true)
            }
            setLastScrollY(window.scrollY)
        }
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScroll)
            return () => {
                window.removeEventListener("scroll", handleScroll)
            }
        }
    }, [lastScrollY])

    useEffect(() => {
        const fetchUserData = async () => {
            const token = getCookieToken()
            if (token) {
                setIsLoggedIn(true)
                const response = await getUserInfo()
                setUserInfo(response)
            }
        }
        fetchUserData()
    }, [])

    return (
        <header
            className={`w-full fixed top-0 left-0 transition-transform duration-300 ${isShowHeader ? "translate-y-0" : "-translate-y-full"} z-50 bg-SYSTEM-beige`}
        >
            <div className="max-w-[1920px] mx-auto bg-SYSTEM-beige px-[10%] h-[90px] flex items-center justify-between border-b border-GREY-20 font-pretendard text-sm">
                <div className="flex items-center">
                    <Image
                        src={"/icons/logo_text.svg"}
                        width={90}
                        height={60}
                        className="w-[90px] h-[60px] cursor-pointer"
                        alt="yeogi logo"
                        onClick={() => router.push("/")}
                    />
                    <HeaderNavigate />
                </div>
                <div className="flex items-center">
                    <div className="ml-4 flex items-center space-x-12 font-medium">
                        <HeaderSearchBar
                            isSearchBarClicked={isSearchBarClicked}
                            setIsSearchBarClicked={setIsSearchBarClicked}
                        />
                        <HeaderLogin isLoggedIn={isLoggedIn} userInfo={userInfo} />
                        <ProtectedLink href="/createPost">
                            <button className="bg-SYSTEM-black text-SYSTEM-white md:w-[120px] md:h-[46px] w-[46px] h-[46px] rounded-full flex items-center justify-center md:px-5 md:py-[13.5px]  ">
                                <Image
                                    src={"/icons/write.svg"}
                                    width={24}
                                    height={24}
                                    alt="write_icon"
                                    className="w-6 h-6 md:mr-[8px] mr-0"
                                />
                                <span className="hidden md:inline">글쓰기</span>
                            </button>
                        </ProtectedLink>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
