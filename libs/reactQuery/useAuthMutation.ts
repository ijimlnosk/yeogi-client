"use client"

import { postLogin } from "@/apis/auth/signin"
import { UserRequest } from "@/app/auth/_components/signin/type"
import { SigninResult, SocialSignupResponse, UserResponse } from "./type"
import { setAccessToken } from "@/apis/auth/token/access.utils"
import { useState } from "react"
import { logout } from "@/apis/auth/oauthApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { SocialSignupRequest } from "@/app/auth/_components/signup/type"
import { postSocialSignup } from "@/apis/auth/socialSignup"

export const useSignin = (): SigninResult => {
    const [isOpen, setIsOpen] = useState(false)
    const [formState, setFormState] = useState<"success" | "fail" | null>(null)

    const handleOverlay = (isOpen: boolean, state: "success" | "fail" | null = null) => {
        setIsOpen(isOpen)
        setFormState(state)
    }

    const Mutation = useMutation<UserResponse, Error, UserRequest>({
        mutationKey: ["signin"],
        mutationFn: async (data: UserRequest) => {
            const response = await postLogin(data)
            return response
        },
        onSuccess: data => {
            setAccessToken(data.accessToken)
            handleOverlay(true, "success")
        },
        onError: () => {
            handleOverlay(true, "fail")
        },
    })
    return { ...Mutation, isOpen, handleOverlay, formState }
}

export const useSocialSignup = () => {
    const [formState, setFormState] = useState<"success" | "fail">("fail")
    const [isOpen, setIsOpen] = useState(false)
    const handleOverlay = (isOpen: boolean, state: "success" | "fail") => {
        setIsOpen(isOpen)
        setFormState(state)
    }
    const router = useRouter()
    const mutation = useMutation<SocialSignupResponse, Error, SocialSignupRequest>({
        mutationKey: ["signup"],
        mutationFn: async (data: SocialSignupRequest) => {
            const response = await postSocialSignup(data)
            console.log(response, "response")
            return response
        },
        onSuccess: data => {
            handleOverlay(true, "success")
            setFormState("success")
        },
        onError: error => {
            handleOverlay(true, "fail")
        },
    })
    const handleConfirm = () => {
        router.push("/")
    }

    return { ...mutation, isOpen, handleOverlay, formState, handleConfirm }
}

export const useLogout = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.clear()
            router.push("/")
        },
        onError: error => {
            console.error("Logout failed:", error)
        },
    })
}
