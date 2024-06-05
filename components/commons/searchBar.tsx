import React from "react"
import clsx from "clsx"
import Image from "next/image"
import searchIcon from "@/public/icons/search.svg"

const Searchbar = ({ text, size }: { text: string; size: "sm" | "lg" }) => {
    const sizeClasses = clsx({
        "w-[222px] h-[48px] text-sm text-SYSTEM-black": size === "sm",
        "w-[850px] h-[70px] text-bg text-SYSTEM-black": size === "lg",
    })

    return (
        <form className="max-w-md mx-auto">
            <div className="relative ">
                <div className=" absolute inset-y-0 p-6 placeholder:start-0 flex items-center pointer-events-none">
                    <Image src={searchIcon} alt="search_icon" width={24} height={24} text-GREY-50 />
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
                    />
                </div>
            </div>
        </form>
    )
}

export default Searchbar
