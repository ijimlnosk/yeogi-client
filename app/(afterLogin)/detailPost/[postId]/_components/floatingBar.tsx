import arrowIcon from "@/public/icons/arrow_up.svg"
import likeIcon from "@/public/icons/floatinglike.svg"
import shareIcon from "@/public/icons/share.svg"
import { useEffect, useState } from "react"
import FloatingButton from "./floatingButton"

/**
 * FloatingBarComponent
 * @author: Wendy
 *
 */

const FloatingBar = () => {
    const [isActiveState, setIsActiveState] = useState({
        arrow: false,
        like: false,
        share: false,
    })

    const icons = [
        { name: "arrow", icon: arrowIcon, isActive: isActiveState.arrow },
        { name: "like", icon: likeIcon, isActive: isActiveState.like },
        { name: "share", icon: shareIcon, isActive: isActiveState.share },
    ]

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

    //위로올리는 화살표 아이콘기능
    const handleArrowClick = () => {
        setIsActiveState(prev => ({ ...prev, arrow: true }))
        window.scrollTo({ top: 0, behavior: "smooth" })
        setTimeout(() => {
            setIsActiveState(prev => ({ ...prev, arrow: false }))
        }, 500)
    }

    //공유하기 아이콘 기능
    const handleShareClick = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href).then(() => {
                setIsActiveState(prev => ({ ...prev, share: true }))
                setTimeout(() => {
                    setIsActiveState(prev => ({ ...prev, share: false }))
                }, 500)
            })
        }
    }

    const handleClick = (icon: string) => {
        switch (icon) {
            case "arrow":
                handleArrowClick()
                break
            case "like":
                setIsActiveState(prev => ({ ...prev, like: !isActiveState.like }))
                break
            case "share":
                handleShareClick()
                break
            default:
                break
        }
    }

    return (
        <div className="relative">
            <div className="absolute  z-50 " style={{ top: `${scrollY + 225}px`, left: `561px` }}>
                <div className="bg-BRAND-10 shadow-lg rounded-[92px] p-2 flex flex-col items-center gap-2">
                    {icons.map((icon, idx) => (
                        <FloatingButton key={idx} icon={icon} onClick={() => handleClick(icon.name)} />
                    ))}
                </div>
            </div>
            {isActiveState.share && (
                <div
                    className={` absolute left-[540px] top-[50px] w-[279px] h-[59px] rounded-[8px] bg-BRAND-50 flex items-center justify-center ${isActiveState.share ? "opacity-100 transition-opacity duration-300" : "opacity-0"}`}
                >
                    링크가 클립보드에 복사되었습니다
                </div>
            )}
        </div>
    )
}
export default FloatingBar
