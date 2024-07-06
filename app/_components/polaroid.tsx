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
            className={`w-auto h-auto xl:w-7 absolute ml-[166px] xl:ml-[150px] md:ml-[120px] ${rotateFront} z-30`}
            alt="나무 집게 앞면"
        />
        <Image
            width={34}
            height={71}
            src={TongBack}
            className={`w-auto h-auto xl:w-6 ml-[178px] xl:ml-[156px] md:ml-[130px] ${rotateBack} z-[-2]`}
            alt="나무 집게 뒷면"
        />
        <div
            className={clsx(
                `relative top-[-30px] xl:top-[-20px] w-[390px] h-[480px] xl:w-[336px] xl:h-[400px] md:w-[300px] md:h-[390px] bg-SYSTEM-white flex flex-col items-center pt-[20px] md:pt-[20px] shadow-polaroid transition-transform duration-300`,
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
                className="w-[350px] h-[300px] xl:w-[300px] xl:h-[257px] md:w-[320px] md:h-[200px]"
            />
            <div className="w-full flex flex-col items-start pl-[10px]">
                <p className="pt-[20px] pb-[12px] sm:pl-4 text-sm xl:text-xs md:text-xxs font-bold">{step}</p>
                <p className="w-[200px] md:w-[240px sm:pl-4 text-bg xl:text-sm md:text-xxsfont-semibold break-keep">
                    {description} <span className={textColor}>{spanText}</span>.
                </p>
            </div>
        </div>
    </div>
)

export default Polaroid
