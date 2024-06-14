import Input from "@/components/commons/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignupSchema } from "@/constants/signinSchema"
import Button from "@/components/commons/button"
import SignupAgeButton from "./ageButton"
import { useState } from "react"
import { SelectedGender, SignupFormData } from "./type"

const SignupForm = () => {
    const [selectedgender, setSelectedGender] = useState<SelectedGender | "">("")
    const [selectedAge, setSelectedAge] = useState("")

    const handleGenderChange = (selectedGender: SelectedGender) => {
        setSelectedGender(selectedGender)
    }
    const handleAgeSelect = (value: string) => {
        setSelectedAge(value)
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(SignupSchema),
    })
    const onSubmit = (data: SignupFormData) => {
        data.age = selectedAge
        data.gender = selectedgender
    }
    return (
        <div className="w-[450px] h-[790px] top-[95px] left-[760px] rounded-3xl border-[1px] pt-[39px] px-[39px] ">
            <div>
                <div className=" pb-6 text-xs">가게 정보를 입력해 주세요.</div>
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="pb-6">
                        <div className="text-xs pb-[10px]">* 이메일</div>
                        <Input
                            register={register}
                            name="email"
                            errors={errors}
                            placeholder="이메일 주소"
                            className="w-[370px] h-[46px] text-SYSTEM-black bg-GREY-10 "
                        />
                    </div>
                    <div className="pb-6">
                        <div className="text-xs pb-[10px]">* 비밀번호</div>
                        <Input
                            register={register}
                            name="password"
                            errors={errors}
                            placeholder="영문, 숫자, 특수문자 (8~10자)"
                            type="password"
                            className="w-[370px] h-[46px] text-SYSTEM-black bg-GREY-10 "
                        />
                    </div>

                    <div className="pb-6">
                        <div className="text-xs pb-[10px]">* 비밀번호 확인</div>
                        <Input
                            register={register}
                            name="password"
                            errors={errors}
                            type="password"
                            placeholder="설정한 비밀번호를 재입력해 주세요."
                            className="w-[370px] h-[46px] text-SYSTEM-black bg-GREY-10 "
                        />
                    </div>
                    <div className="pb-6">
                        <div className="text-xs pb-[10px]">* 닉네임</div>
                        <div className=" flex gap-4">
                            <Input
                                register={register}
                                name="nickname"
                                errors={errors}
                                placeholder="닉네임 "
                                className="w-[262px] h-[46px] text-SYSTEM-black bg-GREY-10 "
                            />
                            <Button background="gray20" className="text-GREY-80 w-[92px] h-[46px]">
                                중복확인
                            </Button>
                        </div>
                    </div>
                    <div className="pb-6">
                        <div className="text-xs pb-[10px]">* 연령대</div>
                        <SignupAgeButton onAgeSelect={handleAgeSelect} />
                    </div>
                    <div className="pb-10">
                        <div className="text-xs pb-[10px]">* 성별</div>

                        <div className="flex gap-12">
                            <label className="flex items-center gap-[18px]">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={selectedgender === "female"}
                                    onChange={() => handleGenderChange("female")}
                                    className="w-[18px] h-[18px] cursor-pointer appearance-none ring-1 focus:ring-BRAND-500 checked:bg-BRAND-50 border-[1px] border-GREY-50 rounded-full"
                                />
                                <span className="text-GREY-50 ml-2 text-xxs">여성</span>
                            </label>
                            <label className="flex items-center gap-[18px]">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={selectedgender === "male"}
                                    onChange={() => handleGenderChange("male")}
                                    className="w-[18px] h-[18px] cursor-pointer appearance-none ring-1 focus:ring-BRAND-500 checked:bg-BRAND-50 border-[1px] border-GREY-50 rounded-full"
                                />
                                <span className="text-GREY-50 ml-2 text-xxs">남성</span>
                            </label>
                        </div>
                    </div>
                    <div className="pl-[276px]">
                        <Button className="w-[92px] h-[42px] " type="submit" background="black" textColor="white">
                            입력완료
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupForm
