"use client"

import { useEffect, useState } from "react"
import FloatingButton from "./floatingButton"
import { FloatingBarProps } from "./type"

const FloatingBar = ({ icons, isMine }: FloatingBarProps) => {
    const [isActiveState, setIsActiveState] = useState<{ [key: string]: boolean }>({
        arrow: false,
        like: false,
        share: false,
        delete: false,
        update: false,
    })

    const [scrollY, setScrollY] = useState(0)

    const handleScroll = () => {
        setScrollY(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const handleClick = (iconName: string) => {
        switch (iconName) {
            case "arrow":
                handleArrowClick()
                break
            case "like":
                setIsActiveState(prev => ({ ...prev, like: !prev.like }))
                break
            case "share":
                handleShareClick()
                break
            default:
                break
        }
    }

    const handleArrowClick = () => {
        setIsActiveState(prev => ({ ...prev, arrow: true }))
        window.scrollTo({ top: 0, behavior: "smooth" })
        setTimeout(() => {
            setIsActiveState(prev => ({ ...prev, arrow: false }))
        }, 500)
    }

    const handleShareClick = async () => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href)
            setIsActiveState(prev => ({ ...prev, share: true }))
            setTimeout(() => {
                setIsActiveState(prev => ({ ...prev, share: false }))
            }, 500)
        }
    }

    return (
        <div className={`relative ${isMine ? "top-[224px]" : ""}`}>
            <div className="absolute z-50" style={{ top: `${scrollY + 225}px`, left: `561px` }}>
                <div
                    className={` shadow-lg rounded-[92px] p-2 flex flex-col items-center gap-2 ${isMine ? "bg-GREY-30" : "bg-BRAND-10"}`}
                >
                    {icons.map((icon, idx) => (
                        <FloatingButton key={idx} icon={icon} onClick={() => handleClick(icon.name)} />
                    ))}
                </div>
            </div>
            {isActiveState.share && (
                <div
                    className={`absolute left-[540px] top-[50px] w-[279px] h-[59px] rounded-[8px] bg-BRAND-50 flex items-center justify-center ${
                        isActiveState.share ? "opacity-100 transition-opacity duration-300" : "opacity-0"
                    }`}
                >
                    링크가 클립보드에 복사되었습니다
                </div>
            )}
        </div>
    )
}

export default FloatingBar
