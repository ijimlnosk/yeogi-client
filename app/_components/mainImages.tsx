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
            <Image width={135} height={786} src={Travel01} className="w-auto h-auto" alt="travel image" />
            <Image width={450} height={665} src={Travel02} className="w-auto h-auto pt-[2%]" alt="travel image" />
            <Image width={525} height={340} src={Travel03} className="w-auto h-auto absolute left-[42%] bottom-0" alt="travel image" />
            <Image width={315} height={392} src={Stamp03} className="w-[315px] h-[392px] absolute bottom-[-30%] -z-10" alt="travel stamp" />
        </div>
    )
}

export const RightGroup = () => {
    return (
        <div className="flex flex-col relative w-[30%]">
            <Image width={215} height={335} src={Memo} className="w-[215px] h-[335px] absolute top-[14%] right-0 z-10" alt="travel memo" />
            <Image width={467} height={260} src={Stamp01} className="w-[467px] h-[260px] absolute top-[36%] right-[-10%]" alt="travel stamp" />
            <Image width={129} height={400} src={Stamp02} className="w-auto h-auto absolute top-[44%] right-0" alt="travel stamp" />
        </div>
    )
}

export const Polaroids = () => {
    return (
        <div className="w-full h-full pt-[24%] flex items-center justify-center">
            <Image width={1920} height={206}  src={Line} className="w-[1920px] h-[206px] absolute w-full top-[420px] z-[-1]" alt="string" />
            <div className="w-[1680px] h-[600px] flex flex-row items-center justify-between">
                <div className="h-full pt-[23px]">
                    <Polaroid
                        step="STEP 01"
                        src={Step01}
                        alt="step 01"
                        description="세계 곳곳을 다녀온 추억을"
                        spanText="기록하세요"
                        textColor="text-BRAND-50"
                        top={"top-[-40px]"}
                        rotateBack={"rotate-[30deg]"}
                    />
                </div>
                <div className="h-full pt-[110px]">
                    <Polaroid
                        step="STEP 02"
                        src={Step02}
                        alt="step 02"
                        description="다른 사람의 여행 기록글을"
                        spanText="읽어보세요"
                        textColor="text-ACCENT-coral"
                        top={"top-[-46px]"}
                        rotateFront={"rotate-[-30deg]"}
                    />
                </div>
                <div className="h-full pt-[55px]">
                    <Polaroid
                        step="STEP 03"
                        src={Step03}
                        alt="step 03"
                        description="좋아요와 댓글로 기록글에"
                        spanText="공감하세요"
                        textColor="text-ACCENT-orange"
                        top={"top-[-40px]"}
                        rotateFront={"rotate-[-50deg]"}
                        rotateBack={"rotate-[-20deg]"}
                    />
                </div>
            </div>
        </div>
    )
}
