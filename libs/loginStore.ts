import { create } from "zustand";
import { LoginState } from "./type";
import { UserInfoProps } from "@/components/layouts/type";

export const useLoggedIn = create<LoginState>(set => ({
    isLoggedIn: false,
    isLoading: true,
    setIsLoggedIn: (loggedIn) => set({isLoggedIn: loggedIn}),
    userInfo: undefined as UserInfoProps | undefined,
    setUserInfo: (userInfo?: UserInfoProps) => set({userInfo,isLoading: false}),
    setLoading: (loading: boolean) => set({isLoading: loading})
}))