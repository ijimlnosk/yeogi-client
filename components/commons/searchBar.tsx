"use client"

import clsx from "clsx"
import Image from "next/image"
import searchIcon from "@/public/icons/searchbar.svg"
import { SearchBarProps } from "./type"
import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

const SearchBar = ({ text, size, onChange }: SearchBarProps) => {
    const sizeClasses = clsx({
        "w-[222px] h-[48px] text-sm text-SYSTEM-black": size === "sm",
        "w-[850px] h-[70px] text-bg text-SYSTEM-black": size === "lg",
    })

    const router = useRouter()
    const [keyword, setKeyword] = useState<string>("")

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

    return (
        <form className="max-w-auto mx-auto" onSubmit={handleSubmit}>
            <div className="relative ">
                <div className=" absolute inset-y-0 p-6 placeholder:start-0 flex items-center pointer-events-none">
                    <Image width={24} height={24} src={searchIcon} alt="search_icon" />
                </div>
                <div>
                    <input
                        type="search"
                        id="default-search"
                        className={clsx(
                            "block border p-2 ps-14 border-GREY-30 rounded-[81px]  outline-none focus:ring-transparent focus:ring-0 focus:border-SYSTEM-black ",
                            sizeClasses,
                        )}
                        placeholder={text}
                        required
                        onChange={handleChange}
                    />
                </div>
            </div>
        </form>
    )
}

export default SearchBar
