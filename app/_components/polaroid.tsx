import { TongBack, TongFront } from "@/constants/mainImages"
import clsx from "clsx"
import Image from "next/image"
import { PolaroidProps } from "./type"

const Polaroid = ({
    step,
    src,
    alt,
    description,
    spanText,
    textColor,
    rotateFront,
    rotateBack,
    className,
}: PolaroidProps) => (
    <div className="relative">
        <Image
            width={42}
            height={76}
            src={TongFront}
            className={`w-auto h-auto xl:w-7 absolute ml-[166px] xl:ml-[150px] ${rotateFront} z-30`}
            alt="나무 집게 앞면"
        />
        <Image
            width={34}
            height={71}
            src={TongBack}
            className={`w-auto h-auto xl:w-6 ml-[178px] xl:ml-[156px] ${rotateBack} z-[-2]`}
            alt="나무 집게 뒷면"
        />
        <div
            className={clsx(
                `relative top-[-30px] xl:top-[-20px] w-[390px] h-[464px] xl:w-[336px] xl:h-[400px] bg-SYSTEM-white flex flex-col items-start pt-[20px] pl-[20px] shadow-polaroid transition-transform duration-300`,
                className,
                {
                    "hover:shadow-polaroid-hover": true,
                    "hover:scale-110": true,
                    "hover:z-100": true,
                    "hover:cursor-pointer": true,
                },
            )}
        >
            <Image
                width={350}
                height={300}
                src={src}
                alt={alt}
                className="w-[350px] h-[300px] xl:w-[300px] xl:h-[257px]"
            />
            <p className="pt-[20px] pb-[12px] text-sm xl:text-xs font-bold">{step}</p>
            <p className="w-[200px] text-bg xl:text-sm font-semibold break-keep">
                {description} <span className={textColor}>{spanText}</span>.
            </p>
        </div>
    </div>
)

export default Polaroid
