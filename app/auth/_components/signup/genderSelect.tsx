import { GenderSelectProps } from "./type"

const GenderSelect = ({ selectedGender, onGenderChange }: GenderSelectProps) => {
    return (
        <div className="flex flex-col  w-full gap-[10px] mb-15">
            <div>
                <span className="text-SYSTEM-error mr-1">*</span>성별
            </div>
            <div className="flex gap-12 pb-8">
                <label className="flex items-center gap-[18px]">
                    <input
                        type="radio"
                        name="gender"
                        value="F"
                        checked={selectedGender === "F"}
                        onChange={() => onGenderChange("F")}
                        className="w-[18px] h-[18px] cursor-pointer appearance-none ring-1 focus:ring-BRAND-500 checked:bg-BRAND-50 border-[1px] border-GREY-50 rounded-full"
                    />
                    <span className="text-GREY-50 ml-2 text-xxs">여성</span>
                </label>
                <label className="flex items-center gap-[18px]">
                    <input
                        type="radio"
                        name="gender"
                        value="M"
                        checked={selectedGender === "M"}
                        onChange={() => onGenderChange("M")}
                        className="w-[18px] h-[18px] cursor-pointer appearance-none ring-1 focus:ring-BRAND-500 checked:bg-BRAND-50 border-[1px] border-GREY-50 rounded-full"
                    />
                    <span className="text-GREY-50 ml-2 text-xxs">남성</span>
                </label>
            </div>
        </div>
    )
}

export default GenderSelect
