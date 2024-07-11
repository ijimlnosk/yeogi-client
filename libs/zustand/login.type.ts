import { UserInfoProps } from "@/components/layouts/type"

export type LoginState = {
    isLoggedIn: boolean
    setIsLoggedIn: (isLoggedIn: boolean) => void
    userInfo: UserInfoProps | undefined
    setUserInfo: (userInfo: UserInfoProps) => void
}
