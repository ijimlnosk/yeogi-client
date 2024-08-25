import Image from "next/image"
import { PinPosition, UpdatedWorldMapModalProps } from "./type"
import { useCallback, useState } from "react"
import { putPins } from "@/apis/mapApi"
import PinModal from "./pinModal"

const UpdatedWorldMapModal = ({ pinId, isOpen, setIsOpen, onClose }: UpdatedWorldMapModalProps) => {
    const [pinPosition, setPinPosition] = useState<PinPosition | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const relativeX = (x / rect.width) * 100
        const relativeY = (y / rect.height) * 100

        const newPinPosition = { x: relativeX, y: relativeY }
        setPinPosition(newPinPosition)
        setIsModalOpen(true)
    }

    const handleSaveClick = async () => {
        if (pinPosition) {
            try {
                await putPins({ pinId, pinPosition: pinPosition })
                setIsModalOpen(false)
                setIsOpen(false)
                onClose()
            } catch (error) {
                console.error("Error saving pin position:", error)
            }
        }
    }

    if (!isOpen) return null

    return (
        <>
            <PinModal isOpen={isModalOpen} onClick={() => setIsModalOpen(false)} onLeftClick={handleSaveClick} />
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                onClick={e => e.target === e.currentTarget && onClose()}
            >
                <div className="w-[90%] max-w-[1686px]">
                    <div onClick={handleMapClick} className="relative aspect-[1686/797]">
                        <Image src="/images/map.svg" alt="World Map" layout="fill" objectFit="contain" />
                        {pinPosition && (
                            <div
                                className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    left: `${pinPosition.x}%`,
                                    top: `${pinPosition.y}%`,
                                }}
                            >
                                <Image src="/images/pin.svg" alt="Pin" width={24} height={24} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatedWorldMapModal
