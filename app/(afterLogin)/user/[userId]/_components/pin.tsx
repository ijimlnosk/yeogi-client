import Image from "next/image"
import { PinProps } from "./type"
import Link from "next/link"

const Pin = ({ post, isUpdate, selectedPin, onClick }: PinProps) => {
    return (
        <>
            <Image
                src={"/images/pin.svg"}
                alt="Pin"
                style={{
                    left: `${post.pin.x}%`,
                    top: `${post.pin.y}%`,
                    transform: "translate(-50%, -50%)",
                    cursor: isUpdate ? "pointer" : "default",
                }}
                className="absolute"
                width={30}
                height={40}
                onClick={e => onClick(post, e)}
            />
            {selectedPin && selectedPin.id === post.id && (
                <div
                    style={{
                        left: `${selectedPin.pin.x}%`,
                        top: `${selectedPin.pin.y}%`,
                        transform: "translate(10%, -110%)",
                    }}
                    className="absolute z-10 w-[56px] h-[56px] "
                >
                    <Link href={`/detailPost/${selectedPin.id}`}>
                        <Image
                            src={selectedPin.thumbnail}
                            alt="thumnail"
                            width={56}
                            height={56}
                            className="border-[2px] border-SYSTEM-error rounded-[50%] w-[56px] h-[56px] object-cover"
                        />
                    </Link>
                </div>
            )}
        </>
    )
}
export default Pin
