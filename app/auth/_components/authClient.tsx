// import { getCodeFromUrl, postAuthCode } from "@/apis/auth/oauthApi"
// import { SocialSignupResponse } from "@/libs/reactQuery/type"
// import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"

// export type Provider = "kakao" | "google" | "naver"

// export type AuthClientProps = {
//     kakaoURL: string
//     googleURL: string
//     naverURL: string
// }

// const AuthClient = ({kakaoURL,googleURL,naverURL}:AuthClientProps) => {

//     const [provider, setProvider] = useState<Provider | null>(null)
//     const [memberIsFirst, setMemberIsFirst] = useState<boolean | null>(null)
//     const [oauthData, setOauthData] = useState<SocialSignupResponse | null>(null)
//     const router = useRouter()

//     const handleMoveSocialLogin = (url: string, provider: Provider) => {
//         setProvider(provider)
//         window.localStorage.setItem("provider", provider)
//         window.location.href = url
//     }

//     useEffect(() => {
//         const fetchData = async () => {
//             const code = getCodeFromUrl()
//             const savedProvider = window.localStorage.getItem("provider") as Provider
//             if (code && savedProvider) {
//                 const data: SocialSignupResponse = await postAuthCode(savedProvider)
//                 setOauthData(data)
//                 if (data.isFirst === false) {
//                     setMemberIsFirst(false)
//                     setAccessToken(data.token.accessToken)
//                     setRefreshToken(data.token.refreshToken)
//                     router.push("/")
//                 } else {
//                     setMemberIsFirst(true)
//                 }
//             }
//         }
//         fetchData()
//     }, [provider, router])

//     return (
//         <div className="min-h-screen flex items-center justify-center">
//             {memberIsFirst === true && oauthData ? (
//                 <AddInfoForm data={oauthData} />
//             ) : (
//                 <SocialLoginLayout
//                     kakaoURL={kakaoURL}
//                     naverURL={naverURL}
//                     googleURL={googleURL}
//                     handleMoveSocialLogin={handleMoveSocialLogin}
//                 />
//             )}
//         </div>
//     )
// }
// export default AuthClient
