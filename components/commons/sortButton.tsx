import React from "react"
import { SortButtonProps } from "./type"

const SortButton = ({ label, isActive, onClick, showBorder }: SortButtonProps) => {
    return (
        <div className="item-center flex flex-col justify-center items-center px-[40px]">
            <div
                onClick={onClick}
                className={` flex flex-col justify-center w-[60px] h-[42px] cursor-pointer items-center text-center ${showBorder ? "border-b-[1px] border-t-[1px] border-GREY-20" : ""} ${isActive ? "text-SYSTEM-black  font-semibold" : " text-GREY-50"}`}
            >
                {label}
            </div>
        </div>
    )
}

export default SortButton
