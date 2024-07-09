import Button from "@/components/commons/button"
import { useState } from "react"
import { SelectedGender } from "./type"
import SignupAgeButton from "./ageButton"
import GenderSelect from "./genderSelect"

const AddInfoForm = () => {
    const [selectedGender, setSelectedGender] = useState<SelectedGender | "">("")
    const [, setSelectedAge] = useState("")

    const handleAgeSelect = (value: string) => {
        setSelectedAge(value)
    }

    const handleGenderChange = (selectedGender: SelectedGender) => {
        setSelectedGender(selectedGender)
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className=" flex flex-col  justify-center w-[496px] h-[604px] top-[233px] left-[712px] rounded-2xl  bg-SYSTEM-else p-12 ">
                <div className=" w-[400px] h-[480px]">
                    <div className="flex text-xs text-BRAND-70  items-center ">가입 정보를 입력해주세요.</div>
                    <div className=" flex flex-col text-xs justify-center  pt-8 ">
                        <div className="flex flex-col  w-full gap-[10px] pb-6">
                            <div>
                                <span className="text-SYSTEM-error mr-1">*</span>이메일
                            </div>
                            <input
                                placeholder=" yeogi@gmail.com"
                                className="w-[400px] h-[46px] border-[1px]  rounded-s focus:outline-none focus:border-BRAND-50"
                            />
                        </div>
                        <div className="flex flex-col  w-full gap-[10px] pb-6">
                            <div>
                                <span className="text-SYSTEM-error mr-1">*</span>닉네임
                            </div>
                            <div className=" flex justify-between">
                                <input
                                    placeholder=" ex) 여행 기록자"
                                    className="w-[275px] h-[46px] border-[1px]  rounded-s focus:outline-none focus:border-BRAND-50"
                                />
                                <Button background="gray20" textColor="gray80" className="w-[101px] h-[46px] rounded-s">
                                    중복 확인
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col  w-full gap-[10px] pb-6">
                            <div>
                                <span className="text-SYSTEM-error mr-1">*</span>연령대
                            </div>
                            <SignupAgeButton onAgeSelect={handleAgeSelect} />
                        </div>
                        <div className="flex flex-col  w-full gap-[10px] pb-6 ">
                            <GenderSelect selectedGender={selectedGender} onGenderChange={handleGenderChange} />
                        </div>
                        <div className="flex justify-end">
                            <Button background="black" textColor="white" className="w-[92px] h-[42px] rounded-[4px]">
                                입력 완료
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4"></div>
            </div>
        </div>
    )
}
export default AddInfoForm
