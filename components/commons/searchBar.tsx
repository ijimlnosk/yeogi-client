import React from "react"
import clsx from "clsx"

const Searchbar = ({ text, size }: { text: string; size: "sm" | "lg" }) => {
    const sizeClasses = clsx({
        "w-[222px] h-[48px] text-sm text-SYSTEM-black": size === "sm",
        "w-[850px] h-[70px] text-bg text-SYSTEM-black": size === "lg",
    })

    return (
        <form className="max-w-md mx-auto">
            <div className="relative ">
                <div className=" absolute inset-y-0 p-3 placeholder:start-0 flex items-center pointer-events-none">
                    <svg
                        className="w-[24px] h-[24px] text-GREY-50 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <div>
                    <input
                        type="search"
                        id="default-search"
                        className={clsx(
                            "block border p-4 ps-11 border-GREY-30 rounded-[81px]  outline-none focus:ring-transparent focus:ring-0 focus:border-SYSTEM-black ",
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
