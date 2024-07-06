"use client"

import clsx from "clsx"
import Image from "next/image"
import { SearchBarProps } from "./type"
import { ChangeEvent, FormEvent, useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import SearchDropdown from "./searchDropdown"

const SearchBar = ({ text, size, onChange, isFocused, setIsFocused }: SearchBarProps) => {
    const sizeClasses = clsx({
        "w-[222px] h-[48px] text-sm text-SYSTEM-black": size === "sm",
        "w-[850px] h-[70px] xl:w-[740px] xl:h-[52px] sm:w-[590px] sm:h-[48px] text-bg xl:text-sm sm:text-md text-SYSTEM-black":
            size === "lg",
    })

    const router = useRouter()
    const [keyword, setKeyword] = useState<string>("")
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`/search?keyword=${keyword}`)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
        if (onChange) {
            onChange(e)
        }
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsFocused(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })

    return (
        <form className="max-w-auto mx-auto" onSubmit={handleSubmit}>
            <div className="relative">
                <div className="absolute inset-y-0 p-6 placeholder:start-0 flex items-center pointer-events-none">
                    <Image
                        width={24}
                        height={24}
                        src={"icons/searchbar.svg"}
                        className="w-auto h-auto xl:w-5 xl:h-5"
                        alt="search_icon"
                    />
                </div>
                <div>
                    <input
                        type="search"
                        id="default-search"
                        className={clsx(
                            "block border p-2 ps-14 border-2 border-ACCENT-orange outline-none focus:ring-transparent focus:ring-0 focus:border-GREY-10",
                            sizeClasses,
                            size === "lg" && isFocused
                                ? "border-t-GREY-10 rounded-t-[36px] rounded-b-0"
                                : "rounded-[81px]",
                        )}
                        placeholder={text}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        autoComplete="off"
                    />
                </div>
                {size === "lg" && (
                    <div
                        ref={dropdownRef}
                        className={clsx(
                            "transition-all duration-[300ms] transform",
                            isFocused ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-0",
                        )}
                    >
                        <SearchDropdown />
                    </div>
                )}
            </div>
        </form>
    )
}
export default SearchBar
