import Image from "next/image"
import { PinThumbnailProps } from "./type"
import { useRouter } from "next/navigation"

const PinThumbnail = ({ thumbnail, postId }: PinThumbnailProps) => {
    const router = useRouter()

    const handleThumbnail = () => {
        router.push(`/post/detail/${postId}`)
    }

    return (
        <div
            className=" absolute w-14 h-14 -top-20 left-2 border-2 border-ACCENT-orange rounded-full"
            onClick={handleThumbnail}
        >
            <Image src={thumbnail} alt="thumbnail" fill className="rounded-full" />
        </div>
    )
}
export default PinThumbnail
