import React, { useState } from "react"
import SortButton from "./sortButton"
import Image from "next/image"
import listIcon from "@/public/icons/list.svg"
import { sortDropDownClasses } from "@/constants/sortButton"

const SortDropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [activeSort, setActiveSort] = useState("latest")

    const sorts = [
        { key: "likes", label: "최신 순" },
        { key: "comments", label: "좋아요 순" },
        { key: "latest", label: "댓글 순" },
    ]

    const handleSortClick = (key: string) => {
        setActiveSort(key)
        setIsOpen(false)
    }

    return (
        <div className="relative inline-block">
            <div>
                <button type="button" className={`${sortDropDownClasses.base}`} onClick={() => setIsOpen(!isOpen)}>
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
