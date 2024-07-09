import { create } from "zustand"
import { LoginState } from "./type"
import { UserInfoProps } from "@/components/layouts/type"

export const useLoggedIn = create<LoginState>(set => ({
    isLoggedIn: false,
    setIsLoggedIn: loggedIn => set({ isLoggedIn: loggedIn }),
    userInfo: undefined,
    setUserInfo: (userInfo?: UserInfoProps) => set({ userInfo }),
}))
