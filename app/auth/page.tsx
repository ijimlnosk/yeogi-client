"use client"

import kakaoIcon from "@/public/icons/kakao.svg"
import naverIcon from "@/public/icons/naver_icon 1.svg"
import googleIcon from "@/public/icons/google.svg"
import SocialLoginButton from "./_components/signin/socialLoginButton"
import { useEffect, useState } from "react"
import { getCodeFromUrl, postAuthCode } from "@/apis/auth/oauthApi"
import { setCookieToken } from "@/apis/auth/storageUtils"
import { useRouter } from "next/navigation"

type Provider = "kakao" | "google" | "naver"
const AuthForm = () => {
    const K_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API
    const G_REST_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_REST_API
    const N_REST_API_KEY = process.env.NEXT_PUBLIC_NAVER_REST_API
    const REDIRECT_URI = `http://localhost:3000/auth`
    // const REDIRECT_URI = `https://yeogi-client.vercel.app/auth`
    const [provider, setProvider] = useState<string | null>(null)

    // 네이버는 사이트 간 요청 위조 공격 방지를 위해 어플리케이션에서 생성한 상태 토큰값으로 URL 인코딩을 적용한 값을 사용
    const naverState = Math.random().toString(36).substring(2)
    const router = useRouter()

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email%20profile&client_id=${G_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${N_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&state=${naverState}`

    const handleMoveSocialLogin = (url: string, provider: Provider) => {
        setProvider(provider)
        window.localStorage.setItem("provider", provider)
        window.location.href = url
    }

    useEffect(() => {
        const fetchData = async () => {
            const code = getCodeFromUrl()
            const savedProvider = window.localStorage.getItem("provider") as Provider
            if (code && savedProvider) {
                const data = await postAuthCode(savedProvider)
                setCookieToken(data.accessToken)
                router.push("/")
            }
        }
        fetchData()
    }, [provider])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className=" flex flex-col  justify-center w-[496px] h-[454px] top-[308px] left-[712px] rounded-2xl  bg-SYSTEM-else p-12 ">
                <div>
                    <div className="flex justify-center h-[64px] text-[44px] text-BRAND-70 font-myeongjo items-center">
                        Login
                    </div>
                    <div className=" flex justify-center text-center pt-10 pb-8">
                        <div className="flex items-center w-full ">
                            <div className="flex-grow h-[1px] bg-BRAND-30"></div>
                            <div className="flex-shrink-0 px-[10px]  text-BRAND-70 font-myeongjo text-xs text-center justify-center items-center">
                                SNS로 간편하게 로그인하세요.
                            </div>
                            <div className="flex-grow h-[1px] bg-BRAND-30"></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4">
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
                        onClick={() => handleMoveSocialLogin(googleURL, "google")}
                    />
                </div>
            </div>
        </div>
    )
}

export default AuthForm
