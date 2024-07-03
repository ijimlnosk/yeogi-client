"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import searchIcon from "@/public/icons/search.svg"
import writeIcon from "@/public/icons/write.svg"
import SearchBar from "../commons/searchBar"
import LogoText from "@/public/icons/logo_text.svg"
import ProtectedLink from "../protectedLink"
import { getCookieToken } from "@/apis/auth/storageUtils"
import { getUserInfo } from "@/apis/userApi"
import { UserInfoProps } from "./type"
import { useRouter } from "next/navigation"

const Header = () => {
    const [isShowHeader, setIsShowHeader] = useState<boolean>(true)
    const [lastScrollY, setLastScrollY] = useState<number>(0)
    const [isSearchbarClicked, setIsSearchbarClicked] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<UserInfoProps | undefined>()
    const [, setSearchKeyword] = useState<string>("")
    const [activePage, setActivePage] = useState<string>("/")

    const handleScroll = () => {
        if (typeof window !== "undefined") {
            if (window.scrollY > lastScrollY) {
                setIsSearchbarClicked(false)
                setIsShowHeader(false)
            } else {
                setIsShowHeader(true)
            }
            setLastScrollY(window.scrollY)
        }
    }

    const router = useRouter()

    const handleClick = (page: string) => {
        router.push(page)
        setActivePage(page)
    }

    const handleKeyword = (keyword: string) => {
        setSearchKeyword(keyword)
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
        <>
            <header
                className={`w-full fixed top-0 left-0 transition-transform duration-300 ${isShowHeader ? "translate-y-0" : "-translate-y-full"} z-50 bg-SYSTEM-beige`}
            >
                <div className="max-w-[1920px] mx-auto bg-SYSTEM-beige px-[10%] h-[90px] flex items-center justify-between border-b border-GREY-20 font-pretendard text-sm">
                    <div className="flex items-center">
                        <Link href="/" className="w-[90px] h-[60px]">
                            <Image
                                src={LogoText}
                                width={90}
                                height={60}
                                className="w-[90px] h-[60px]"
                                alt="yeogi logo"
                            />
                        </Link>
                        <nav className="hidden md:block">
                            <ul className="w-full h-20  ml-8 flex justify-evenly items-center">
                                <li
                                    onClick={() => handleClick("/")}
                                    className={`text-SYSTEM-black font-bold text-xs xl:text-sm  w-fit px-6 py-8 ${activePage === "/" && "border-b-2 border-SYSTEM-black"}`}
                                >
                                    커뮤니티
                                </li>
                                <li
                                    onClick={() => handleClick("/survey")}
                                    className={`text-SYSTEM-black font-bold text-xs xl:text-sm  w-fit px-6 py-8 ${activePage === "/survey" && "border-b-2 border-SYSTEM-black"}`}
                                >
                                    내 취향 찾기
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="flex items-center">
                        <div className="ml-4 flex items-center space-x-12 font-medium">
                            <button onClick={() => setIsSearchbarClicked(true)}>
                                {isSearchbarClicked ? (
                                    <div className="hidden sm:block">
                                        <SearchBar text="" size="sm" onChange={e => handleKeyword(e.target.value)} />
                                    </div>
                                ) : (
                                    <Image
                                        src={searchIcon}
                                        width={24}
                                        height={24}
                                        className="min-w-6 min-h-6 hidden sm:block"
                                        alt="search_icon"
                                    />
                                )}
                            </button>
                            {isLoggedIn ? (
                                <Link href={`/user/${userInfo?.id}`}>
                                    {userInfo?.profile ? (
                                        <Image
                                            src={userInfo.profile}
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
                                <div className="min-w-[48px] min-h-[27px]">
                                    <ProtectedLink href="/auth">로그인</ProtectedLink>
                                </div>
                            )}

                            <ProtectedLink href="/createPost">
                                <button className="bg-SYSTEM-black text-SYSTEM-white md:w-[120px] md:h-[46px] w-[46px] h-[46px] rounded-full flex items-center justify-center md:px-5 md:py-[13.5px]  ">
                                    <Image
                                        src={writeIcon}
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
        </>
    )
}

export default Header
