"use client"

import { useEffect, useState } from "react"
import { getCodeFromUrl, postAuthCode } from "@/apis/auth/oauthApi"
import { useRouter } from "next/navigation"
import SocialLoginLayout from "./_components/signin/socialLoginLayout"
import AddInfoForm from "./_components/signup/addInfoForm"
import { SocialSignupResponse } from "@/libs/reactQuery/type"
import { setAccessToken } from "@/apis/auth/token/access.utils"
import { setRefreshToken } from "@/apis/auth/token/refresh.utils"

type Provider = "kakao" | "google" | "naver"

const AuthForm = () => {
    const K_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API
    const G_REST_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_REST_API
    const N_REST_API_KEY = process.env.NEXT_PUBLIC_NAVER_REST_API
    const REDIRECT_URI = `http://localhost:3000/auth`
    // const REDIRECT_URI = `https://yeogi-client.vercel.app/auth`
    const [provider, setProvider] = useState<Provider | null>(null)
    const [memberIsFirst, setMemberIsFirst] = useState<boolean | null>(null)
    const [oauthData, setOauthData] = useState<SocialSignupResponse | null>(null)
    // 네이버는 사이트 간 요청 위조 공격 방지를 위해 어플리케이션에서 생성한 상태 토큰값으로 URL 인코딩을 적용한 값을 사용
    const naverState = Math.random().toString(36).substring(2)
    const router = useRouter()

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email%20profile&client_id=${G_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${N_REST_API_KEY}&state=${naverState}&redirect_uri=${REDIRECT_URI}`

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
                const data: SocialSignupResponse = await postAuthCode(savedProvider)
                setOauthData(data)
                if (data.isFirst === false) {
                    setMemberIsFirst(false)
                    setAccessToken(data.token.accessToken)
                    setRefreshToken(data.token.refreshToken)
                    router.push("/")
                } else {
                    setMemberIsFirst(true)
                }
            }
        }
        fetchData()
    }, [provider, router])
    return (
        <div className="min-h-screen flex items-center justify-center">
            {memberIsFirst === true && oauthData ? (
                <AddInfoForm data={oauthData} />
            ) : (
                <SocialLoginLayout
                    kakaoURL={kakaoURL}
                    naverURL={naverURL}
                    googleURL={googleURL}
                    handleMoveSocialLogin={handleMoveSocialLogin}
                />
            )}
        </div>
    )
}

export default AuthForm
