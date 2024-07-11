import { create } from "zustand"
import { UserInfoProps } from "@/components/layouts/type"
import { LoginState } from "./login.type"

export const useLoggedIn = create<LoginState>(set => ({
    isLoggedIn: false,
    setIsLoggedIn: loggedIn => set({ isLoggedIn: loggedIn }),
    userInfo: undefined,
    setUserInfo: (userInfo?: UserInfoProps) => set({ userInfo }),
}))
