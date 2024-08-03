import Button from "@/components/commons/button"
import Image from "next/image"
import { FloatingButtonProps } from "./type"

/**
 * FloatingButton
 * @author: Wendy
 * @param {FloatingIcon} prop.icon - FloatingButton안에 들어갈 아이콘
 * @param {Function} prop.onClick - FloatingBar 컴포넌트 안에서 사용되는 handler함수
 */

const FloatingButton = ({ icon, onClick, disabled }: FloatingButtonProps) => {
    return (
        <Button
            className={`bg-SYSTEM-white rounded-[52px] w-[56px] h-[56px] p-4 ${icon.isActive ? "active" : ""}${disabled ? "cursor-not-allowed" : ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            <Image
                src={icon.icon}
                width={24}
                height={24}
                alt={`${icon.name} icon`}
                className="filter-ACCENT-orange "
                style={{
                    filter: icon.isActive
                        ? "invert(59%) sepia(57%) saturate(3021%) hue-rotate(344deg) brightness(95%) contrast(105%)"
                        : "none",
                }}
            />
        </Button>
    )
}
export default FloatingButton
