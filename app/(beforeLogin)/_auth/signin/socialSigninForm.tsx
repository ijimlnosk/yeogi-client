import SocialLoginButton from "./socialLoginButton"
import { SocialSigninFormProps } from "./type"
import kakaoIcon from "@/public/icons/kakao.svg"
import naverIcon from "@/public/icons/naver_icon 1.svg"
import googleIcon from "@/public/icons/google.svg"

const SocialSigninForm = ({ onClose }: SocialSigninFormProps) => {
    return (
        <div className="w-[400px] h-[530px] top-[225px] left-[760px] rounded-3xl border-[1px] border-BRAND-70 bg-SYSTEM-white">
            <div className="pt-[71px]">
                <div className="flex justify-center h-[64px] text-subTitle text-BRAND-70 font-myeongjo items-center top-[68px]">
                    여기
                </div>
                <div className="flex justify-center h-[39px] pt-1 text-BRAND-70 font-myeongjo text-[28px]">YEOGI</div>
            </div>
            <div className="flex flex-col items-center gap-3 pt-[89px]">
                <SocialLoginButton icon={kakaoIcon} text={"카카오톡으로 간편하게 로그인"} bgColor="bg-SNS-kakao" />
                <SocialLoginButton icon={naverIcon} text={"네이버로 간편하게 로그인"} bgColor="bg-SNS-naver" />
                <SocialLoginButton
                    icon={googleIcon}
                    text={"GOOGLE로 간편하게 로그인"}
                    bgColor="bg-SYSTEM-white"
                    border="border border-GREY-70"
                />
                <div className="text-xxs text-BRAND-70 pt-8">지금 바로 간단하게 여행을 기록하세요!</div>
            </div>
        </div>
    )
}

export default SocialSigninForm
