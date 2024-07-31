"use client"

import Button from "@/components/commons/button"
import TemplateBox from "./templateBox"
import { useState } from "react"
import { useRouter } from "next/navigation"

const SelectTemplate = () => {
    const [selectedType, setSelectedType] = useState<string | null>(null)

    const router = useRouter()

    const handleSelect = (type: string) => {
        setSelectedType(type)
    }

    const handleSubmit = () => {
        if (selectedType) {
            if (selectedType === "type1") {
                router.push("/post/create/free")
            } else if (selectedType === "type2") {
                router.push("/post/create/memo")
            }
        }
    }
    return (
        <>
            <div className="flex flex-row gap-10">
                <div onClick={() => handleSelect("type1")}>
                    <TemplateBox type="type1" isSelected={selectedType === "type1"} />
                </div>
                <div onClick={() => handleSelect("type2")}>
                    <TemplateBox type="type2" isSelected={selectedType === "type2"} />
                </div>
            </div>
            <div className="pt-10">
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
        </>
    )
}
export default SelectTemplate
