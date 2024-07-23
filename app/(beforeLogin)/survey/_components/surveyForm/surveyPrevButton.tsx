import Button from "@/components/commons/button"
import Image from "next/image"
import { SurveyPrevButtonProps } from "./type"

const SurveyPrevButton = ({ currentIndex, handlePrev }: SurveyPrevButtonProps) => (
    <>
        {currentIndex > 0 && (
            <div className="w-[530px] flex justify-end">
                <Button onClick={handlePrev} className="py-2 gap-2">
                    <Image src={"/icons/black_arrow_left.svg"} alt="left black arrow" width={24} height={24} />
                    이전
                </Button>
            </div>
        )}
    </>
)
export default SurveyPrevButton
