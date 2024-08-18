import { Metadata } from "next"
import UserClient from "./_components/userClient"
import * as postApi from "@/apis/postApi"
import { getUserInfo } from "@/apis/userApi"

export async function generateMetadata(): Promise<Metadata> {
    try {
        const userInfo = await getUserInfo()
        return {
            title: `Yeogi | ${userInfo.nickname}'s Page`,
            description: `Check out ${userInfo.nickname}'s profile `,
            openGraph: {
                title: `${userInfo.nickname} on Yeogi`,
                description: `${userInfo.nickname} 님의 마이페이지 입니다.`,
                images: userInfo.profile ? [{ url: userInfo.profile }] : [],
            },
        }
    } catch {
        return {
            title: "Yeogi | Member Page",
            description: "View user profile and posts on Yeogi",
        }
    }
}

const UserPage = async () => {
    const myPosts = await postApi.getMyPosts()

    return <UserClient initialPosts={myPosts} />
}
export default UserPage
