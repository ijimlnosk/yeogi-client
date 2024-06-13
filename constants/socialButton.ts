import kakaoIcon from "@/public/icons/kakao.svg"
import naverIcon from "@/public/icons/naver_icon 1.svg"
import googleIcon from "@/public/icons/google.svg"

//로그인 overlay - 소셜로그인버튼
export const SocialButtonIcon = [
    { icon: kakaoIcon, text: "카카오톡으로 간편하게 로그인", bgColor: "bg-SNS-kakao" },
    { icon: naverIcon, text: "네이버로 간편하게 로그인", bgColor: "bg-SNS-naver" },
    {
        icon: googleIcon,
        text: "Google로 간편하게 로그인",
        bgColor: "bg-SYSTEM-white",
        border: "border border-GREY-60",
    },
]