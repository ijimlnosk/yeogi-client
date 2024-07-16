import { create } from "zustand"
import { LoginState } from "./type"
import { UserInfoType } from "@/types/user"

export const useLoggedIn = create<LoginState>(set => ({
    isLoggedIn: false,
    setIsLoggedIn: loggedIn => set({ isLoggedIn: loggedIn }),
    userInfo: undefined,
    setUserInfo: (userInfo?: UserInfoType) => set({ userInfo }),
}))
