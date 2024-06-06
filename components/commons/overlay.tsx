import clsx from "clsx"
import { ReactNode } from "react"

type OverlayProps = {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    widthCss?: string
    heightCss?: string
}

/**
 * Overlay Component
 * author: Gang
 * @param {boolean} isOpen - 오버레이의 표시 여부 제어
 * @param {Function} props.onClose - 오버레이를 닫을 때 호출되는 콜백함수 닫기 or 오버레이 바깥 클릭 시 닫힘
 * @param {ReactNode} props.children - 오버레이 내부에 표시될 내용
 */

const Overlay = ({ isOpen, onClose, children }: OverlayProps) => {
    if (!isOpen) return null

    const contentCss = clsx(
        "bg-SYSTEM-white p-4 rounded-lg shadow-lg w-auto mx-auto my-auto flex justify-center items-center",
    )

    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div className={contentCss} onClick={e => e.stopPropagation()}>
                {children}
                <button onClick={onClose} className="absolute top-2 right-2 text-lg font-bold"></button>
            </div>
        </div>
    )
}

export default Overlay
