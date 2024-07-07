import Image from "next/image"
import Polaroid from "./polaroid"
import {
    Line,
    Memo,
    Stamp01,
    Stamp02,
    Stamp03,
    Step01,
    Step02,
    Step03,
    Travel01,
    Travel02,
    Travel03,
} from "@/constants/mainImages"

export const LeftGroup = () => {
    return (
        <div className="flex flex-row relative items-start w-[70%] top-[10%]">
            <Image
                width={135}
                height={786}
                src={Travel01}
                className="w-auto h-auto 2xl:visible invisible"
                alt="travel image"
            />
            <Image
                width={450}
                height={665}
                src={Travel02}
                className="w-auto h-auto pt-[2%] relative 2xl:right-0 xl:right-[40%] md:right-[50%] sm:right-[96%]"
                alt="travel image"
            />
            <Image
                width={525}
                height={340}
                src={Travel03}
                className="w-auto h-auto absolute 2xl:left-[36%] bottom-0 xl:left-[18%] md:left-[0] sm:right-[40%]"
                alt="travel image"
            />
            <Image
                width={315}
                height={392}
                src={Stamp03}
                className="w-[315px] h-[392px] absolute bottom-[-30%] -z-10 sm:right-[60%]"
                alt="travel stamp"
            />
        </div>
    )
}

export const RightGroup = () => {
    return (
        <div className="flex flex-col relative w-[30%] 2xl:left-0 xl:left-[6%] md:left-[8%] sm:left-[12%]">
            <Image
                width={215}
                height={335}
                src={Memo}
                className="w-[215px] h-[335px] absolute top-[14%] right-0 z-10"
                alt="travel memo"
            />
            <Image
                width={467}
                height={260}
                src={Stamp01}
                className="w-[467px] h-[260px] absolute top-[36%] right-[-10%]"
                alt="travel stamp"
            />
            <Image
                width={129}
                height={400}
                src={Stamp02}
                className="w-auto h-auto absolute top-[44%] right-0"
                alt="travel stamp"
            />
        </div>
    )
}

export const Polaroids = () => {
    return (
        <div className="w-full h-[980px] pt-10 flex items-center justify-center invisible sm:visible">
            <Image width={1920} height={206} src={Line} className="absolute w-full top-[22%]" alt="string" />
            <div className="absolute w-[1680px] h-[600px] xl:w-[1200px] lg:w-[1000px] md:min-w-[720px] sm:min-w-[600px] top-[29%] xl:top-[20%] md:top-[18%] flex flex-row items-center justify-between">
                <div>
                    <Polaroid
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
                    <Polaroid
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
                    <Polaroid
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
