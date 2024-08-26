import { calculatePinPosition } from "@/utils/map.utils"
import { MapPinProps } from "./type"
import Image from "next/image"
import PinThumbnail from "./pinThumbnail"

const MapPin = ({ pin, index, isOpen, onClick, matchingPost }: MapPinProps) => {
    const { xPercent, yPercent } = calculatePinPosition(pin)

    return (
        <div
            className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
                left: `${xPercent}%`,
                top: `${yPercent}%`,
            }}
        >
            <div className="relative w-6 h-6 cursor-pointer" onClick={() => onClick(index)}>
                <Image src="/images/pin.svg" alt="pin" fill />
            </div>
            <div className="relative">
                {isOpen && matchingPost && (
                    <PinThumbnail
                        thumbnail={matchingPost.thumbnail || "/images/default/thumbnail01.jpg"}
                        postId={pin.postId}
                    />
                )}
            </div>
        </div>
    )
}

export default MapPin
