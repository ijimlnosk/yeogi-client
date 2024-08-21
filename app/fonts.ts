import { Nanum_Myeongjo } from "next/font/google"
import localFont from "next/font/local"

export const myeongjo = Nanum_Myeongjo({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-myeongjo" })
export const pretendard = localFont({
    src: [
        {
            path: "../public/fonts/Pretendard-Bold.woff",
            weight: "700",
            style: "normal",
        },
        {
            path: "../public/fonts/Pretendard-SemiBold.woff",
            weight: "600",
            style: "normal",
        },
        {
            path: "../public/fonts/Pretendard-Medium.woff",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/Pretendard-Regular.woff",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/Pretendard-Light.woff",
            weight: "300",
            style: "normal",
        },
    ],
    variable: "--font-pretendard",
})
