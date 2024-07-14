import { useState } from "react"
import Image from "next/image"

const HoverableMoreButton = () => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="relative ml-4 flex items-center cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image
                src={"/icons/gt-black.svg"}
                alt="gt-black"
                width={24}
                height={24}
                className={`${isHovered ? "opacity-0" : "opacity-100"}`}
            />
            <div
                className={`absolute text-BRAND-50 left-0 ml-2 whitespace-nowrap overflow-hidden transition-all duration-100 ease-in-out flex flex-row ${
                    isHovered ? "w-20 opacity-100" : "w-0 opacity-0"
                }`}
            >
                <p>모두보기</p>
                <Image src={"/icons/gt-BRAND.svg"} alt="gt-BRAND" width={24} height={24} />
            </div>
        </div>
    )
}

export default HoverableMoreButton
