"use client"

import clsx from "clsx"
import Image from "next/image"
import searchIcon from "@/public/icons/searchbar.svg"
import { SearchBarProps } from "./type"
import { ChangeEvent, FormEvent, useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import SearchDropdown from "./searchDropdown"

const SearchBar = ({ text, size, onChange, setTheme }: SearchBarProps) => {
    const sizeClasses = clsx({
        "w-[222px] h-[48px] text-sm text-SYSTEM-black": size === "sm",
        "w-[850px] h-[70px] text-bg text-SYSTEM-black": size === "lg",
    })

    const router = useRouter()
    const [keyword, setKeyword] = useState<string>("")
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`/search?query=${keyword}`)
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
                    <Image width={24} height={24} src={searchIcon} className="w-auto h-auto" alt="search_icon" />
                </div>
                <div>
                    <input
                        type="search"
                        id="default-search"
                        className={clsx(
                            "block border p-2 ps-14 border-none outline-none focus:ring-transparent focus:ring-0 focus:border-GREY-10",
                            sizeClasses,
                            isFocused ? "border-t-GREY-10 rounded-t-[36px] rounded-b-0" : "rounded-[81px]",
                        )}
                        placeholder={text}
                        required
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        autoComplete="off"
                    />
                </div>
                {isFocused && (
                    <div ref={dropdownRef}>
                        <SearchDropdown setTheme={setTheme} />
                    </div>
                )}
            </div>
        </form>
    )
}
export default SearchBar
