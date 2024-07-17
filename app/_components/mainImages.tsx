import Image from "next/image"
import {
    Line,
    Memo,
    Stamp01,
    Stamp02,
    Stamp04,
    Step01,
    Step02,
    Step03,
    Travel01,
    Travel02,
    Travel03,
} from "@/constants/mainImages"
import { useEffect, useState } from "react"
import { Skeleton } from "@nextui-org/react"
import dynamic from "next/dynamic"

export const LeftGroup = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="flex flex-row relative items-start w-[70%] top-[10%]">
            {isLoading ? (
                <>
                    <Skeleton className="w-[135px] h-[786px] relative 4xl:top-10 2xl:visible invisible" />
                    <Skeleton className="w-[450px] h-[665px] pt-[2%] right-[98%] xl:pt-0 relative 4xl:top-[70px] 2xl:right-0 xl:right-[50%] lg:right-[60%] md:right-[80%] sm:right-[90%]" />
                    <Skeleton className="w-[525px] h-[340px] absolute top-[40%] 4xl:top-[56%] 4xl:left-[580px] 2xl:left-[44%] bottom-0 xl:left-[14%] xl:bottom-10 md:left-[130px] md:top-[47%] sm:right-[26%] sm:top-[42%]" />
                    <Skeleton className="w-[315px] h-[392px] absolute top-[46%] bottom-[-17%] -z-10 4xl:left-[-30px] 4xl:top-[74%] 3xl:top-[80%] xl:right-[67%] xl:top-[61%] sm:right-[67%] sm:top-[61%] opacity-10" />
                </>
            ) : (
                <>
                    <Image
                        width={135}
                        height={786}
                        src={Travel01}
                        fetchPriority="high"
                        className="w-[135px] h-[786px] relative 4xl:top-10 2xl:visible invisible"
                        loading="lazy"
                        alt="travel image"
                    />
                    <Image
                        width={450}
                        height={665}
                        src={Travel02}
                        priority
                        fetchPriority="high"
                        className="w-[450px] h-[665px] pt-[2%] right-[98%] xl:pt-0 relative 4xl:top-[70px] 2xl:right-0 xl:right-[50%] lg:right-[60%] md:right-[80%] sm:right-[90%]"
                        alt="travel image"
                    />
                    <Image
                        width={525}
                        height={340}
                        src={Travel03}
                        fetchPriority="high"
                        className="w-[525px] h-[340px] absolute top-[40%] 4xl:top-[56%] 4xl:left-[580px] 2xl:left-[44%] bottom-0 xl:left-[14%] xl:bottom-10 md:left-[130px] md:top-[47%] sm:right-[26%] sm:top-[42%]"
                        alt="travel image"
                        priority
                    />
                    <Image
                        width={315}
                        height={392}
                        src={Stamp04}
                        fetchPriority="high"
                        className="w-[315px] h-[392px] absolute top-[46%] bottom-[-17%] -z-10 4xl:left-[-30px] 4xl:top-[74%] 3xl:top-[80%] xl:right-[67%] xl:top-[61%] sm:right-[67%] sm:top-[61%] opacity-10"
                        alt="travel stamp"
                        loading="lazy"
                    />
                </>
            )}
        </div>
    )
}

export const RightGroup = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="flex flex-col relative w-[30%] 2xl:left-0 xl:left-[6%] md:left-[8%] sm:left-[12%]">
            {isLoading ? (
                <>
                    <Skeleton className="w-[215px] h-[335px] absolute top-[6.3%] right-0 z-10" />
                    <Skeleton className="w-[467px] h-[260px] absolute top-[30%] right-[-10%]" />
                    <Skeleton className="w-[129px] h-[400px] absolute top-[41%] right-0" />
                </>
            ) : (
                <>
                    <Image
                        width={215}
                        height={335}
                        src={Memo}
                        fetchPriority="high"
                        className="w-[215px] h-[335px] absolute top-[6.3%] right-0 z-10"
                        alt="travel memo"
                        loading="lazy"
                    />
                    <Image
                        width={467}
                        height={260}
                        src={Stamp01}
                        fetchPriority="high"
                        className="w-[467px] h-[260px] absolute top-[30%] right-[-10%]"
                        alt="travel stamp"
                        loading="lazy"
                    />
                    <Image
                        width={129}
                        height={400}
                        src={Stamp02}
                        fetchPriority="high"
                        className="w-[129px] h-[400px] absolute top-[41%] right-0"
                        alt="travel stamp"
                        loading="lazy"
                    />
                </>
            )}
        </div>
    )
}

const DynamicPolaroid = dynamic(() => import("./polaroid"), {
    loading: () => <Skeleton className="w-[336px] h-[400px]" />,
})

export const Polaroids = () => {
    return (
        <div className="w-full h-0 pt-10 items-center justify-center hidden md:flex md:h-[980px]">
            <Image width={1920} height={206} src={Line} className="absolute w-full top-[22%]" alt="string" />
            <div className="absolute w-[1680px] h-[600px] xl:w-[1200px] lg:w-[1000px] md:w-[720px] sm:w-[600px] top-[29%] xl:top-[20%] md:top-[18%] md:gap-4 flex flex-row items-center justify-between">
                <div>
                    <DynamicPolaroid
                        step="STEP 01"
                        src={Step01}
                        alt="step 01"
                        description="세계 곳곳을 다녀온 추억을"
                        spanText="기록하세요"
                        textColor="text-BRAND-50"
                        rotateBack={"rotate-[30deg]"}
                    />
                </div>
                <div className="mt-[140px]">
                    <DynamicPolaroid
                        step="STEP 02"
                        src={Step02}
                        alt="step 02"
                        description="다른 사람의 여행 기록글을"
                        spanText="읽어보세요"
                        textColor="text-ACCENT-coral"
                        rotateFront={"rotate-[-30deg]"}
                    />
                </div>
                <div className="mt-9">
                    <DynamicPolaroid
                        step="STEP 03"
                        src={Step03}
                        alt="step 03"
                        description="좋아요와 댓글로 기록글에"
                        spanText="공감하세요"
                        textColor="text-ACCENT-orange"
                        rotateFront={"rotate-[-50deg]"}
                        rotateBack={"rotate-[-20deg]"}
                    />
                </div>
            </div>
        </div>
    )
}
