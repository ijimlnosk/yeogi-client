"use client"

import { useEffect, useState } from "react"
import SortButton from "./sortButton"
import Image from "next/image"
import listIcon from "@/public/icons/list.svg"
import { useRouter } from "next/navigation"
import { isSortConditionType, SortConditionType, SortDropdownProps, sorts } from "@/types/sortCondition"

const SortDropdown = ({ initialValue = "RECENT" }: SortDropdownProps) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [activeSort, setActiveSort] = useState(initialValue)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const sort = params.get("sortCondition")
        if (sort && isSortConditionType(sort)) {
            setActiveSort(sort)
        }
    }, [])

    const handleSortClick = (key: SortConditionType) => {
        setActiveSort(key)
        setIsOpen(false)

        const params = new URLSearchParams(window.location.search)
        params.set("sortCondition", key)
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
                    <Image src={listIcon} alt="list_Icon" width={24} height={24} className="w-[24px] h-[24px] mr-1" />
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
                                onClick={() => isSortConditionType(sort.key) && handleSortClick(sort.key)}
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
