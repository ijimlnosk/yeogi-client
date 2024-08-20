import Button from "@/components/commons/button"
import { useState } from "react"
import { SelectedGender, SocialSignupRequest } from "./type"
import { SocialSignupSchema } from "@/constants/signinSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAuthMutaion } from "@/libs/reactQuery/useAuthMutation"
import { SocialSignupResponse } from "@/libs/reactQuery/type"
import useCheckNickname from "@/hook/useCheckNicknameExists"
import SuccessToFailModal from "@/components/commons/successToFailModal"
import EmailInputForm from "./emailInputForm"
import NickNameInputForm from "./nicknameInputForm"
import AgeGenderInputForm from "./ageGenderInputForm"

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

    const { mutate, showModal, handleConfirm } = useAuthMutaion()
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
                        <EmailInputForm email={data.email} />
                        <NickNameInputForm
                            register={register}
                            handleNicknameCheck={handleNicknameCheck}
                            message={message}
                            errors={errors}
                        />
                        <AgeGenderInputForm
                            selectedAge={selectedAge}
                            selectedGender={selectedGender}
                            handleAgeSelect={handleAgeSelect}
                            handleGenderChange={handleGenderChange}
                        />
                        <div className="flex justify-end ">
                            <Button
                                background="black"
                                textColor="white"
                                className="w-[92px] h-[42px] rounded-s"
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
                context={"축하합니다! 회원가입이 성공적으로 완료되었습니다."}
                isOpen={showModal}
                onClick={() => handleConfirm()}
                state="success"
            />
        </div>
    )
}

export default AddInfoForm
