import React from "react"
import { SortButtonProps } from "./type"
import { SortButtonClasses } from "@/constants/sortButton"

const SortButton = ({ label, isActive, onClick, showBorder }: SortButtonProps) => {
    const baseClass = SortButtonClasses.base
    const borderClass = showBorder ? SortButtonClasses.border : ""
    const activeClass = isActive ? SortButtonClasses.active : SortButtonClasses.inactive

    return (
        <div className="item-center flex flex-col justify-center items-center px-[40px]">
            <div onClick={onClick} className={`${baseClass} ${borderClass} ${activeClass}`}>
                {label}
            </div>
        </div>
    )
}

export default SortButton
