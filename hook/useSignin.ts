"use client"

import { postLogin } from "@/apis/auth/signin"
import { UserRequest } from "@/app/auth/_components/signin/type"
import { useMutation } from "@tanstack/react-query"
import { SigninResult, UserResponse } from "./type"
import { setAccessToken } from "@/apis/auth/token/access.utils"
import { useState } from "react"

const useSignin = (): SigninResult => {
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

export default useSignin
