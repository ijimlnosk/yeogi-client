import Overlay from "@/components/commons/overlay"
import Calendar from "./calendar"
import CheckIcon from "@/public/icons/white_check.svg"
import { selectComponentProps } from "../type"

const SelectCalendar = ({ isOpen, onClick }: selectComponentProps) => {
    return (
        <Overlay
            isOpen={isOpen}
            onClick={onClick}
            imageUrl={CheckIcon}
            text={"선택 완료"}
            textColor={"text-SYSTEM-white"}
        >
            <div className="w-[448px] h-[500px]">
                <Calendar />
            </div>
        </Overlay>
    )
}
export default SelectCalendar
