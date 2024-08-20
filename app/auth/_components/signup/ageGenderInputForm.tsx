import SignupAgeButton from "./ageButton"
import GenderSelect from "./genderSelect"
import { AgeGenderInputFormProps } from "./type"

const AgeGenderInputForm = ({ selectedGender, handleAgeSelect, handleGenderChange }: AgeGenderInputFormProps) => {
    return (
        <>
            <div className="flex flex-col w-full gap-2.5 pb-6 ">
                <div>
                    <span className="text-SYSTEM-error mr-1">*</span>연령대
                </div>
                <SignupAgeButton onAgeSelect={handleAgeSelect} />
            </div>
            <div className="flex flex-col w-full gap-[9px] ">
                <GenderSelect selectedGender={selectedGender} onGenderChange={handleGenderChange} />
            </div>
        </>
    )
}
export default AgeGenderInputForm
