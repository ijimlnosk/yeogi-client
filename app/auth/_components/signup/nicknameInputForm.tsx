import Button from "@/components/commons/button"
import { NicknameInputFormProps } from "./type"

const NickNameInputForm = ({ register, handleNicknameCheck, message, errors }: NicknameInputFormProps) => {
    return (
        <div className="flex flex-col w-full gap-2.5 ">
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
                {errors.nickname && <div className=" text-[13px]  text-SYSTEM-error">{errors.nickname.message}</div>}
            </div>
        </div>
    )
}
export default NickNameInputForm
