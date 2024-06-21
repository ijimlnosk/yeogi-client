"use client"

import kakaoIcon from "@/public/icons/kakao.svg"
import naverIcon from "@/public/icons/naver_icon 1.svg"
import googleIcon from "@/public/icons/google.svg"
import SocialLoginButton from "../(beforeLogin)/_auth/signin/socialLoginButton"
import { useEffect } from "react"
import { postKakaoAuthCode } from "@/apis/auth/kakaoApi"

const AuthForm = () => {
    const K_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API
    const K_REDIRECT_URI = `http://localhost:3000`
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`
    const handleKakaoLogin = () => {
        window.location.href = kakaoURL
    }
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const code = new URLSearchParams(window.location.search).get("code")
                console.log(code, "codecode")
                if (code) {
                    await postKakaoAuthCode()
                }
            } catch (error) {
                console.error("Error generating token:", error)
            }
        }
        fetchToken()
    }, [])

    return (
        <div className="w-[400px] h-[530px] top-[225px] left-[760px] rounded-3xl border-[1px] border-BRAND-70 bg-SYSTEM-white">
            <div className="pt-[71px]">
                <div className="flex justify-center h-[64px] text-subTitle text-BRAND-70 font-myeongjo items-center top-[68px]">
                    여기
                </div>
                <div className="flex justify-center h-[39px] pt-1 text-BRAND-70 font-myeongjo text-[28px]">YEOGI</div>
            </div>
            <div className="flex flex-col items-center gap-3 pt-[89px]">
                <SocialLoginButton
                    icon={kakaoIcon}
                    text={"카카오톡으로 간편하게 로그인"}
                    bgColor="bg-SNS-kakao"
                    onClick={handleKakaoLogin}
                />
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

export default AuthForm
