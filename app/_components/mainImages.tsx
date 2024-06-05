import Image from "next/image"
import Travel01 from "@/public/images/main-01.svg"
import Travel02 from "@/public/images/main-02.svg"
import Travel03 from "@/public/images/main-03.svg"
import Memo from "@/public/images/main-memo.svg"
import Stamp01 from "@/public/images/main-stamp-01.svg"
import Stamp02 from "@/public/images/main-stamp-02.svg"
import Stamp03 from "@/public/images/main-stamp-03.svg"

export const LeftGroup = () => {
    return (
        <div className="flex flex-row relative items-start w-[70%] top-[10%]">
            <Image width={135} src={Travel01} alt="travel image" />
            <Image width={450} src={Travel02} className="pt-[2%]" alt="travel image" />
            <Image width={525} src={Travel03} className="absolute left-[42%] bottom-[22%]" alt="travel image" />
            <Image width={315} src={Stamp03} className="absolute bottom-[4%] -z-10" alt="travel stamp" />
        </div>
    )
}
export const RightGroup = () => {
    return (
        <div className="flex flex-col relative w-[30%] h-full">
            <Image width={215} src={Memo} className="absolute top-[14%] right-0 z-10" alt="travel memo" />
            <Image width={332} src={Stamp01} className="absolute top-[36%] right-0" alt="travel stamp" />
            <Image width={129} src={Stamp02} className="absolute top-[44%] right-0" alt="travel stamp" />
        </div>
    )
}
