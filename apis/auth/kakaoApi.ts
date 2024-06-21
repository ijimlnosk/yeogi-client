import { fetchFormAPI } from "@/utils/fetchFormAPI"

const POST_KAKAO_API_URL = "/auth"
const code = new URLSearchParams(window.location.search).get("code")

//백엔드한테 카카오인가코드 주기
export const postKakaoAuthCode = async()=>{
    if (!code) {
        throw new Error("코드를 받아오지 못했습니다.");
    }
    const response = await fetch(`${POST_KAKAO_API_URL}/auth/generateToken/kakao?code=${code}`,{
        method:"POST",
    })
    
    if (!response.ok) {
        throw new Error( "실패하였습니다.");
    }
    const data = await response.json()
    console.log(data, "datatatatat")
    return data
} 

// 백엔드로부터 받아오는 토큰값
export const getKakaoAuthToken = async()=>{
    const response = await fetch(`${POST_KAKAO_API_URL}/auth/generateToken/kakao?code=${code}`,{
        method:"GET",
        
})
if (!response.ok) {
    throw new Error( "실패하였습니다.");
}
const data = await response.json()
console.log(data, "안녕 나는 토큰값이야")
return data
}