import Overlay from "@/components/commons/overlay"
import Calendar from "./calendar"
import { SwitchOverlayProps } from "../type"
import CheckIcon from "@/public/icons/white_check.svg"
import SelectedContinent from "./selectContinent"

const SwitchOverlay = ({ isContinentOverlayOpen, isCalendarOverlayOpen, onClose }: SwitchOverlayProps) => {
    const isOverlayOpen = isContinentOverlayOpen || isCalendarOverlayOpen
    const isContinent = isContinentOverlayOpen

    return (
        <Overlay
            isOpen={isOverlayOpen}
            onClick={onClose}
            imageUrl={CheckIcon}
            text={"선택 완료"}
            textColor={"text-SYSTEM-white"}
        >
            {isContinent ? (
                <SelectedContinent />
            ) : (
                <div className="w-[448px] h-[500px]">
                    <Calendar />
                </div>
            )}
        </Overlay>
    )
}

export default SwitchOverlay
