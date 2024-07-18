export type UserInfoType = {
    id: number
    email: string
    nickname: string
    motto: string
    ageRange: string
    gender: "M" | "F"
    profile?: string // google profileImage
    profile_image?: string // naver & kakao profileImage
    banner: string
    keywordList: Keyword[]
}

export type Keyword = {
    title: string
}

// GET(member/me)
export type MyUserInfoType = {
    id: number
    email: string
    nickname: string
    motto: string
    ageRange: string
    gender: "M" | "F"
    image: string
    banner: string
    keywordList: Keyword[]
}

// PUT(member)
export type EditUserInfoType = {
    id: number
    email: string
    nickname: string
    motto: string
    ageRange: string
    gender: "M" | "F"
    image: string
    banner: string
    first: boolean
}
