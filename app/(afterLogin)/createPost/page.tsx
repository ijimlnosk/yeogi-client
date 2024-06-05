"use client"

import Button from "@/components/commons/button"
import TemplateBox from "./_components/templateBox"
import { useState } from "react"
import { useRouter } from "next/navigation"

const Page = () => {
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const router = useRouter()

    const handleSelect = (type: string) => {
        setSelectedType(type)
    }

    const handleSubmit = () => {
        if (selectedType) {
            if (selectedType === "type1") {
                router.push("/freeForm")
            } else if (selectedType === "type2") {
                router.push("/memoForm")
            }
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-[1040px] h-[704px] flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center pb-[40px]">
                    <p className="font-myeongjo text-xl">
                        여기는 기록할 수 있는 <span className="text-BRAND-50">두 가지</span> 방법을 제공해!
                    </p>
                    <p className="font-myeongjo text-xl">본인의 기록 스타일을 선택하세요!</p>
                </div>
                <div className="flex flex-row gap-10">
                    <div onClick={() => handleSelect("type1")}>
                        <TemplateBox type="type1" isSelected={selectedType === "type1"} />
                    </div>
                    <div onClick={() => handleSelect("type2")}>
                        <TemplateBox type="type2" isSelected={selectedType === "type2"} />
                    </div>
                </div>
                <div className="pt-[40px]">
                    <Button
                        background={"black"}
                        textColor={"white"}
                        rounded={"lg"}
                        className="w-[115px] h-[48px]"
                        onClick={handleSubmit}
                    >
                        선택 완료
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default Page
