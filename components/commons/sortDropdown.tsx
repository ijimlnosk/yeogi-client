"use client"

import { useEffect, useState } from "react"
import SortButton from "./sortButton"
import Image from "next/image"
import listIcon from "@/public/icons/list.svg"
import { useRouter } from "next/navigation"
import { sorts } from "@/constants/sorts"

const SortDropdown = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [activeSort, setActiveSort] = useState("latest")

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const sort = params.get("sort")
        if (sort && sorts.some(s => s.key === sort)) {
            setActiveSort(sort)
        }
    }, [])

    const handleSortClick = (key: string) => {
        setActiveSort(key)
        setIsOpen(false)

        const params = new URLSearchParams(window.location.search)
        params.set("sort", key)
        const newUrl = `${window.location.pathname}?${params.toString()}`
        router.push(newUrl, { scroll: false })
    }

    return (
        <div className="relative inline-block z-[100]">
            <div>
                <button
                    type="button"
                    className=" text-xs inline-flex justify-center w-[120px] h-[44px] px-3 py-2.5 border rounded-[73px] text-GREY-80  border-GREY-80 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Image src={listIcon} alt="list_Icon" width={24} height={24} className="mr-1" />
                    {sorts.find(sort => sort.key === activeSort)?.label}
                </button>
            </div>

            {isOpen && (
                <div className=" border rounded-3xl py-3 w-[140px] h-[148px] bg-SYSTEM-white absolute shadow-lg  focus:outline-none">
                    <div className=" items-center text-center ">
                        {sorts.map((sort, index) => (
                            <SortButton
                                key={sort.key}
                                label={sort.label}
                                isActive={activeSort === sort.key}
                                onClick={() => handleSortClick(sort.key)}
                                showBorder={index === 1}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SortDropdown
