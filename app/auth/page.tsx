import SocialLoginLayout from "./_components/signin/socialLoginLayout"

const AuthForm = () => {
    // const K_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API
    // const G_REST_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_REST_API
    // const N_REST_API_KEY = process.env.NEXT_PUBLIC_NAVER_REST_API
    // const REDIRECT_URI = `http://localhost:3000/auth`
    // const REDIRECT_URI = `https://yeogi-client.vercel.app/auth`

    // 네이버는 사이트 간 요청 위조 공격 방지를 위해 어플리케이션에서 생성한 상태 토큰값으로 URL 인코딩을 적용한 값을 사용
    // const naverState = Math.random().toString(36).substring(2)

    // const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    // const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email%20profile&client_id=${G_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
    // const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${N_REST_API_KEY}&state=${Math.random().toString(36).substring(2)}&redirect_uri=${REDIRECT_URI}`

    return (
        // <AuthClient kakaoURL={kakaoURL} googleURL={googleURL} naverURL={naverURL}  />
        <>
            <SocialLoginLayout />
        </>
    )
}

export default AuthForm
