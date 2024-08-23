import Image from "next/image"
import { UpdatedWorldMapModalProps } from "./type"
import { useState } from "react"

export type PinPosition = {
    x: number
    y: number
}

const UpdatedWorldMapModal = ({ isOpen, onClose }: UpdatedWorldMapModalProps) => {
    const [pinPosition, setPinPosition] = useState<PinPosition | null>(null)

    if (!isOpen) return null

    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const relativeX = (x / rect.width) * 100
        const relativeY = (y / rect.height) * 100

        setPinPosition({ x: relativeX, y: relativeY })

        console.log(`Clicked at: ${relativeX.toFixed(2)}%, ${relativeY.toFixed(2)}%`)
    }

    return (
        <div>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                onClick={handleBackgroundClick}
            >
                <div onClick={handleMapClick} className=" relative w-[90%] max-w-[1686px] h-[797px]">
                    <Image src={"/images/map.svg"} alt="World Map" fill />
                    {pinPosition && (
                        <div
                            style={{
                                position: "absolute",
                                left: `${pinPosition.x}%`,
                                top: `${pinPosition.y}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <Image src="/images/pin.svg" alt="Pin" width={24} height={24} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default UpdatedWorldMapModal
