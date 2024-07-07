export type UserInfoProps = {
    id: number
    email: string
    nickname: string
    ageRange: string
    gender: "M" | "W"
    profile?: string //google profileImage
    profile_image?: string //naver & kakao profileImage
    motto: string
    banner: string
}
