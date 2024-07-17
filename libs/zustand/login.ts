import { create } from "zustand"
import { LoginState } from "./type"
import { MyUserInfoType } from "@/types/user"

export const useLoggedIn = create<LoginState>(set => ({
    isLoggedIn: false,
    setIsLoggedIn: loggedIn => set({ isLoggedIn: loggedIn }),
    userInfo: undefined,
    setUserInfo: (userInfo?: MyUserInfoType) => set({ userInfo }),
}))
