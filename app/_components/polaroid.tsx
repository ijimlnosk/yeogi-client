import { TongBack, TongFront } from "@/constants/mainImages"
import clsx from "clsx"
import Image from "next/image"

type PolaroidProps = {
    step: string
    src: { src: string; width: number; height: number }
    alt: string
    description: string
    spanText: string
    textColor: string
    top: string
    rotateFront?: string
    rotateBack?: string
    className?: string
}

const Polaroid = ({
    step,
    src,
    alt,
    description,
    spanText,
    textColor,
    top,
    rotateFront,
    rotateBack,
    className,
}: PolaroidProps) => (
    <div className="relative">
        <Image
            width={42}
            src={TongFront}
            className={`absolute ${top} left-[166px] ${rotateFront} z-40`}
            alt="나무 집게 앞면"
        />
        <Image
            width={34}
            src={TongBack}
            className={`absolute ${top} left-[178px] ${rotateBack} z-[-2]`}
            alt="나무 집게 뒷면"
        />
        <div
            className={clsx(
                `w-[390px] h-[464px] bg-SYSTEM-white flex flex-col items-start pt-[20px] pl-[20px] shadow-polaroid transition-transform duration-300 z-20`,
                className,
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
                {description} <span className={textColor}>{spanText}</span>.
            </p>
        </div>
    </div>
)

export default Polaroid
