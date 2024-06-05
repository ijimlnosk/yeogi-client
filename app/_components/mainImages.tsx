import Image from "next/image"
/* intro */
import Travel01 from "@/public/images/main-01.svg"
import Travel02 from "@/public/images/main-02.svg"
import Travel03 from "@/public/images/main-03.svg"
import Memo from "@/public/images/main-memo.svg"
import Stamp01 from "@/public/images/main-stamp-01.svg"
import Stamp02 from "@/public/images/main-stamp-02.svg"
import Stamp03 from "@/public/images/main-stamp-03.svg"
/* desc */
import Line from "@/public/images/line.svg"
import Step01 from "@/public/images/step-01.svg"
import Step02 from "@/public/images/step-02.svg"
import Step03 from "@/public/images/step-03.svg"

export const LeftGroup = () => {
    return (
        <div className="flex flex-row relative items-start w-[70%] top-[10%]">
            <Image width={135} src={Travel01} alt="travel image" />
            <Image width={450} src={Travel02} className="pt-[2%]" alt="travel image" />
            <Image width={525} src={Travel03} className="absolute left-[42%] bottom-0" alt="travel image" />
            <Image width={315} src={Stamp03} className="absolute bottom-[-30%] -z-10" alt="travel stamp" />
        </div>
    )
}
export const RightGroup = () => {
    return (
        <div className="flex flex-col relative w-[30%]">
            <Image width={215} src={Memo} className="absolute top-[14%] right-0 z-10" alt="travel memo" />
            <Image width={332} src={Stamp01} className="absolute top-[36%] right-0" alt="travel stamp" />
            <Image width={129} src={Stamp02} className="absolute top-[44%] right-0" alt="travel stamp" />
        </div>
    )
}

export const Polaroids = () => {
    return (
        <div className="w-full h-[775px] pt-[24%] z-20">
            <Image width={1920} src={Line} className="absolute top-[50%]" alt="string" />
            <div className="w-[390px] h-[464px] bg-SYSTEM-white flex flex-col items-start pt-[20px] pl-[20px]">
                <Image width={350} src={Step01} alt="step 01" />
                <p className="pt-[20px] pb-[12px]">STEP 01</p>
                <p>
                    세계 곳곳을 다녀온 추억을 <span className="">기록하세요</span>.
                </p>
            </div>
        </div>
    )
}
