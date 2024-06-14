"useClient"
import Input from "@/components/commons/input"
import { SigninSchema } from "@/constants/signinSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { UserRequest } from "./type"
import { useState } from "react"
import Button from "@/components/commons/button"
import { postLogin } from "@/apis/auth/signin"
import { useQueryClient } from "@tanstack/react-query"

const SigninForm = () => {
    const [isChecked, setIsChecked] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserRequest>({
        resolver: zodResolver(SigninSchema),
    })
    const handleEmailSave = () => {
        setIsChecked(!isChecked)
    }
    const queryClient = useQueryClient()

    const onSubmit = async (data: UserRequest) => {
        try {
            const response = await postLogin(data)
            queryClient.setQueryData(["user"], response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="w-[400px] h-[579px] top-[225px] left-[760px] rounded-3xl border-[1px] border-BRAND-70 bg-SYSTEM-white">
            <div className="pt-[45px]  pb-[49px]">
                <div className="flex justify-center h-[64px] text-subTitle text-BRAND-70 font-myeongjo items-center top-[68px]">
                    여기
                </div>
                <div className="flex justify-center h-[39px] pt-1 text-BRAND-70 font-myeongjo text-[28px]">YEOGI</div>
            </div>
            <div className="flex flex-col items-center  ">
                <div className="text-xxs text-BRAND-70 ">지금 바로 간단하게 여행을 기록하세요!</div>
                <div>
                    <form className="flex  flex-col gap-[10px] pt-[25px] pb-10 " onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            register={register}
                            name="email"
                            errors={errors}
                            placeholder="이메일 주소"
                            className="w-[340px] h-[44px] text-SYSTEM-black "
                        />
                        <Input
                            register={register}
                            name="password"
                            type="password"
                            errors={errors}
                            placeholder="비밀번호"
                            className="w-[340px] h-[44px] text-GREY-80 rounded-1"
                        />
                        <label className=" flex gap-2  pb-[14px]">
                            <input
                                type="radio"
                                name="saveEmail"
                                checked={isChecked}
                                onClick={handleEmailSave}
                                className="w-[18px] h-[18px] cursor-pointer  appearance-none ring-1 focus:ring-BRAND-500 checked:bg-BRAND-50  border-[1px] border-GREY-50 rounded-full   "
                            />
                            <span className="text-GREY-50 ">이메일 저장</span>
                        </label>
                        <Button type="submit" rounded="md" background="brand50" textColor="white">
                            로그인
                        </Button>
                    </form>
                    <div className="text-center text-xxs flex flex-col items-center">
                        아직 여기 계정이 없으신가요?
                        <button className="text-BRAND-50   w-[52px]">가입하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SigninForm
