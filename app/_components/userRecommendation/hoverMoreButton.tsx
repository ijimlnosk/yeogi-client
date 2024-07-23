"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

const HoverableMoreButton = () => {
    const [isHovered, setIsHovered] = useState(false)
    const router = useRouter()

    return (
        <div
            className="relative ml-4 flex items-center cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className=" relative w-6 h-6">
                <Image
                    src={"/icons/gt-black.svg"}
                    alt="gt-black"
                    fill
                    className={`${isHovered ? "opacity-0" : "opacity-100"} w-auto h-auto object-contain`}
                />
            </div>
            <div
                onClick={() => router.push("/search")}
                className={`absolute text-BRAND-50 left-0 ml-2 whitespace-nowrap overflow-hidden transition-all duration-100 ease-in-out flex flex-row ${
                    isHovered ? "w-20 opacity-100" : "w-0 opacity-0"
                }`}
            >
                <p>모두보기</p>
                <div className=" relative w-6 h-6">
                    <Image src={"/icons/gt-BRAND.svg"} alt="gt-BRAND" fill className="w-auto h-auto object-contain" />
                </div>
            </div>
        </div>
    )
}

export default HoverableMoreButton
