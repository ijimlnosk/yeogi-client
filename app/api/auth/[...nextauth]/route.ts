import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import Kakao from "next-auth/providers/kakao"
import Naver from "next-auth/providers/naver"

const G_REST_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_REST_API
const G_CLIENT_SECRET_KEY = process.env.NEXT_PUBLIC_GOOGLE_ADMIN_KEY
const K_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API
const K_CLIENT_SECRET_KEY = process.env.NEXTAUTH_KAKAO_ADMIN_KEY
const N_REST_API_KEY = process.env.NEXT_PUBLIC_NAVER_REST_API
const N_CLIENT_SECRET_KEY = process.env.NEXT_PUBLIC_NAVER_ADMIN_KEY
const AUTH_API_URL = "http://ec2-43-203-193-158.ap-northeast-2.compute.amazonaws.com:8080"
const redirect_uri = "http://localhost:3000/auth"
//const redirect_uri = "https://yeogi-client.vercel.app/auth"

declare module "next-auth" {
    interface Session {
        accessToken?: string
        provider?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string
        provider?: string
    }
}

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET, // secret: "http://localhost:3000",
    providers: [
        GoogleProvider({
            clientId: G_REST_API_KEY || "",
            clientSecret: G_CLIENT_SECRET_KEY || "",
        }),
        Kakao({
            clientId: K_REST_API_KEY || "",
            clientSecret: K_CLIENT_SECRET_KEY || "",
        }),
        Naver({
            clientId: N_REST_API_KEY || "",
            clientSecret: N_CLIENT_SECRET_KEY || "",
        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 30, //30days
    },
    callbacks: {
        async jwt({ token, account }) {
            console.log("fetch start")
            console.log("JWT Callback - Account:", account)
            console.log("JWT Callback - Initial Token:", token)

            if (account?.provider && account?.access_token) {
                console.log("실행되나?")
                const authorizationParams = new URLSearchParams(window.location.search)
                const authorizationCode = authorizationParams.get("code")
                console.log(authorizationCode)
                if (authorizationCode) {
                    const response = await fetch(
                        //디코채팅 보슈
                        `${AUTH_API_URL}/auth/generateToken/${account.provider}?code=${authorizationCode}&redirect_uri=${redirect_uri}`,
                        { method: "POST" },
                    )
                    if (response.ok) {
                        const data = await response.json()
                        console.log(data, "BE response data")
                        token.accessToken = data.accessToken // 백엔드에서 받은 토큰 저장
                        token.refreshToken = data.refreshToken // 리프레시 토큰이 있다면 저장
                        token.accessTokenExpires = Date.now() + data.expiresIn * 1000
                        token.accessToken = data.accessToken
                    } else {
                        console.error("failed to fetch token from BE", response.status)
                    }
                    // 첫 로그인 여부를 확인하는 로직 추가 가능
                }
            }
            console.log(token, "JWT token")
            return token
        },
        async session({ session, token }) {
            console.log(token, "token")
            session.accessToken = token.accessToken
            console.log(session, "session")
            return session
        },
    },
})

export { handler as GET, handler as POST }
