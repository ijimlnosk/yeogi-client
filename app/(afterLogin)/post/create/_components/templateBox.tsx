import Image from "next/image"
import { TemplateBoxProps } from "./type"

const TemplateBox = ({ type, isSelected }: TemplateBoxProps) => {
    let ruleText = ""
    let title = ""
    let image = ""

    if (type === "type1") {
        ruleText = "방법1"
        title = "자유롭게 줄글 로 적고 싶어요"
        image = "/images/post-template1.svg"
    } else if (type === "type2") {
        ruleText = "방법2"
        title = "간단하게 메모  형식으로 적고 싶어요"
        image = "/images/post-template2.svg"
    }

    const formattedTitle = title.split(" ").map((word, index) => {
        if (word === "메모" || word === "줄글") {
            return (
                <span key={index} className="text-BRAND-50">
                    {word}
                </span>
            )
        }
        return <span key={index}>{word} </span>
    })

    return (
        <div
            className={`w-[500px] h-[478px] flex flex-col items-center justify-center border-2 rounded-md hover:cursor-pointer ${isSelected ? "bg-BRAND-10 bg-opacity-70 border-BRAND-50 shadow-lg" : "border-ACCENT-fireBush bg-SYSTEM-bone"}`}
        >
            <div className="w-[79px] h-[37px] bg-SYSTEM-black rounded-full flex items-center justify-center p-2">
                <p className="text-white text-sm">{ruleText}</p>
            </div>
            <p className="text-GREY-70 text-md font-bold pt-[20px]">{formattedTitle}</p>
            <div className="pt-[20px]">
                <Image src={image} alt="template image" width={"208"} height={"276"} />
            </div>
        </div>
    )
}
export default TemplateBox
