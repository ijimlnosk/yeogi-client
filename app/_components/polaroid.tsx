import { TongBack, TongFront } from "@/constants/mainImages"
import clsx from "clsx"
import Image from "next/image"

interface PolaroidProps {
    step: string
    src: { src: string; width: number; height: number }
    alt: string
    description: string
    spanText: string
    top: number
    rotateFront: number
    rotateBack: number
    mt: number
}

const Polaroid = ({ step, src, alt, description, spanText, top, rotateFront, rotateBack, mt }: PolaroidProps) => (
    <div className="relative">
        <Image
            width={42}
            src={TongFront}
            className={`absolute top-[${top}%] left-[45%] rotate-[${rotateFront}deg] z-40`}
            alt="나무 집게 앞면"
        />
        <Image
            width={34}
            src={TongBack}
            className={`absolute top-[${top}%] left-[${rotateBack}%] rotate-[0deg] z-[-2]`}
            alt="나무 집게 뒷면"
        />
        <div
            className={clsx(
                "w-[390px] h-[464px] bg-SYSTEM-white flex flex-col items-start pt-[20px] pl-[20px] shadow-polaroid transition-transform duration-300",
                `mt-[${mt}%]`,
                {
                    "hover:shadow-polaroid-hover": true,
                    "hover:scale-120": true,
                    "hover:z-100": true,
                    "hover:cursor-pointer": true,
                },
            )}
        >
            <Image width={350} src={src} alt={alt} />
            <p className="pt-[20px] pb-[12px] text-sm font-bold">{step}</p>
            <p className="w-[200px] text-bg font-semibold break-keep">
                {description} <span className="text-ACCENT-orange">{spanText}</span>.
            </p>
        </div>
    </div>
)

export default Polaroid
