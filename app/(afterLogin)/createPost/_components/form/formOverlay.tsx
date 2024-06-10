import Overlay from "@/components/commons/overlay"
import Calendar from "./calendar"
import { FormOverlayProps } from "../type"

const Form = ({
    isContinentOverlayOpen,
    isCalendarOverlayOpen,
    onClose,
    handleContinentSelect,
    selectedContinent,
}: FormOverlayProps) => (
    <>
        <Overlay isOpen={isContinentOverlayOpen} onClick={() => onClose}>
            <div className="flex flex-col w-[448px] h-[397px] p-1 text-sm">
                <h2 className="text-center my-6">대륙 선택</h2>
                <div className="grid grid-cols-2 gap-[20px]">
                    {["아시아", "아프리카", "남아메리카", "북아메리카", "유럽", "오세아니아", "북극", "남극"].map(
                        continent => (
                            <button
                                key={continent}
                                className={`p-4 rounded-[8px] ${
                                    selectedContinent === continent
                                        ? "bg-BRAND-30 text-white"
                                        : "bg-GREY-10 hover:bg-BRAND-30 hover:shadow-custom hover:text-white"
                                }`}
                                onClick={() => handleContinentSelect(continent)}
                            >
                                {continent}
                            </button>
                        ),
                    )}
                </div>
            </div>
        </Overlay>
        <Overlay isOpen={isCalendarOverlayOpen} onClick={() => onClose}>
            <div className="w-[448px] h-[500px]">
                <Calendar onClose={onClose} />
            </div>
        </Overlay>
    </>
)

export default Form
