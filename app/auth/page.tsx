"use client"

import kakaoIcon from "@/public/icons/kakao.svg"
import naverIcon from "@/public/icons/naver_icon 1.svg"
import googleIcon from "@/public/icons/google.svg"
import SocialLoginButton from "../(beforeLogin)/_auth/signin/socialLoginButton"
import { useEffect, useState } from "react"
import { getCodeFromUrl, postAuthCode } from "@/apis/auth/oauthApi"
import { setCookieToken, setSessionToken } from "@/apis/auth/storageUtils"

const AuthForm = () => {
    const K_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API
    const G_REST_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_REST_API
    const N_REST_API_KEY = process.env.NEXT_PUBLIC_NAVER_REST_API
    const REDIRECT_URI = `http://localhost:3000/auth`
    const [provider, setProvider] = useState<string | null>(null)

    // 네이버는 사이트 간 요청 위조 공격 방지를 위해 어플리케이션에서 생성한 상태 토큰값으로 URL 인코딩을 적용한 값을 사용
    const naverState = Math.random().toString(36).substring(2)

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=${G_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${N_REST_API_KEY}&state=${naverState}&redirect_uri=${REDIRECT_URI}`

    const handleMoveSocialLogin = (url: string, provider: string) => {
        setProvider(provider)
        window.location.href = url
    }

    useEffect(() => {
        const fetchData = async () => {
            const code = getCodeFromUrl()
            console.log(code, "난 page에있음 ")
            if (code) {
                try {
                    const data = await postAuthCode("naver")
                    console.log(data, "authdata페이지에있는 데이터")
                    setCookieToken(data.accessToken)
                    setSessionToken(data.accessToken)
                } catch (error) {
                    console.error(error, "ㄷㄱ개개객-oauthapi")
                }
            } else {
                console.log("authpage error")
            }
        }
        fetchData()
    }, [provider])

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
                    onClick={() => handleMoveSocialLogin(kakaoURL, "kakao")}
                />
                <SocialLoginButton
                    icon={naverIcon}
                    text={"네이버로 간편하게 로그인"}
                    bgColor="bg-SNS-naver"
                    onClick={() => handleMoveSocialLogin(naverURL, "naver")}
                />
                <SocialLoginButton
                    icon={googleIcon}
                    text={"GOOGLE로 간편하게 로그인"}
                    bgColor="bg-SYSTEM-white"
                    border="border border-GREY-70"
                    onClick={() => handleMoveSocialLogin(googleURL, "google")}
                />
                <div className="text-xxs text-BRAND-70 pt-8">지금 바로 간단하게 여행을 기록하세요!</div>
            </div>
        </div>
    )
}

export default AuthForm
