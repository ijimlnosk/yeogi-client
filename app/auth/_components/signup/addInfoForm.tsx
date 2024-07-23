import Button from "@/components/commons/button"
import { useState } from "react"
import { SelectedGender, SocialSignupRequest } from "./type"
import SignupAgeButton from "./ageButton"
import GenderSelect from "./genderSelect"
import { SocialSignupSchema } from "@/constants/signinSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useSocialSignup } from "@/libs/reactQuery/useAuthMutation"
import { SocialSignupResponse } from "@/libs/reactQuery/type"
import useCheckNickname from "@/hook/useCheckNicknameExists"
import SuccessToFailModal from "@/components/commons/successToFailModal"

const AddInfoForm = ({ data }: { data: SocialSignupResponse }) => {
    const [selectedGender, setSelectedGender] = useState<SelectedGender>("F")
    const [selectedAge, setSelectedAge] = useState("")
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<SocialSignupRequest>({
        resolver: zodResolver(SocialSignupSchema),
    })

    const { mutate, isOpen, formState, handleOverlay, handleConfirm } = useSocialSignup()
    const { checkNickname, message } = useCheckNickname()

    const onSubmit = (request: SocialSignupRequest) => {
        request.ageRange = selectedAge
        request.gender = selectedGender
        request.memberId = data.memberId
        mutate(request)
    }

    const handleAgeSelect = (value: string) => {
        setSelectedAge(value)
    }

    const handleGenderChange = (selectedGender: SelectedGender) => {
        setSelectedGender(selectedGender)
    }

    const handleNicknameCheck = () => {
        const nickname = getValues("nickname")
        if (nickname) {
            checkNickname(nickname)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col justify-center w-[496px] h-[604px] rounded-2xl bg-SYSTEM-else p-12">
                <div className="w-[400px] h-[480px]">
                    <div className="flex text-xs text-BRAND-70 items-center font-bold">가입 정보를 입력해주세요.</div>
                    <form className="flex flex-col text-xs justify-center pt-8 " onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col w-full gap-2.5 pb-6 ">
                            <div className="w-[400px] h-[22px] ">
                                <span className="text-SYSTEM-error mr-1">*</span>이메일
                            </div>
                            <input
                                placeholder={data.email}
                                className="w-[400px] h-[46px] border-[1px] rounded-s focus:outline-none bg-SYSTEM-else02 pl-2"
                                name="email"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col w-full gap-2.5 pb-0">
                            <div className="w-[400px] h-[106px] ">
                                <div>
                                    <span className="text-SYSTEM-error mr-1">*</span>닉네임
                                </div>

                                <div className="flex justify-between ">
                                    <input
                                        {...register("nickname")}
                                        type="text"
                                        placeholder=" ex) 여행 기록자"
                                        className="w-[275px] h-[46px] border-[1px] rounded-s focus:outline-none focus:border-BRAND-50 pl-2"
                                    />
                                    <Button
                                        background="gray20"
                                        textColor="gray80"
                                        className="w-[101px] h-[46px] rounded-s"
                                        onClick={handleNicknameCheck}
                                    >
                                        중복 확인
                                    </Button>
                                </div>
                                {message && (
                                    <div
                                        className={`text-[13px] flex flex-col  ${message.includes("사용 가능한") ? "text-BRAND-50" : "text-SYSTEM-error"}`}
                                    >
                                        {message}
                                    </div>
                                )}
                                {errors.nickname && (
                                    <div className=" text-[13px]  text-SYSTEM-error">{errors.nickname.message}</div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2.5 pb-6 ">
                            <div>
                                <span className="text-SYSTEM-error mr-1">*</span>연령대
                            </div>
                            <SignupAgeButton onAgeSelect={handleAgeSelect} />
                        </div>
                        <div className="flex flex-col w-full gap-[9px] ">
                            <GenderSelect selectedGender={selectedGender} onGenderChange={handleGenderChange} />
                        </div>
                        <div className="flex justify-end ">
                            <Button
                                background="black"
                                textColor="white"
                                className="w-[92px] h-[42px] rounded-[4px]"
                                type="submit"
                            >
                                입력 완료
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <SuccessToFailModal
                title="회원가입"
                context={
                    formState === "success"
                        ? "축하합니다! 회원가입이 성공적으로 완료되었습니다."
                        : "죄송합니다. 회원가입에 실패했습니다."
                }
                isOpen={isOpen}
                onClick={() => {
                    handleOverlay(false, formState)
                    if (formState === "success") {
                        handleConfirm()
                    }
                }}
                state={formState}
            />
        </div>
    )
}

export default AddInfoForm
