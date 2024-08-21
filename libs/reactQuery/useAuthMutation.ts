"use client"

import { SocialSignupResponse } from "./type"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { SocialSignupRequest } from "@/app/auth/_components/signup/type"
import { postSocialSignup } from "@/apis/auth/socialSignup"
import { useModalStore } from "../zustand/modal"

export const useAuthMutaion = () => {
    const { openModal, showModal, closeModal, setIsDelete, isDelete } = useModalStore()

    const router = useRouter()
    const mutation = useMutation<SocialSignupResponse, Error, SocialSignupRequest>({
        mutationKey: ["signup"],
        mutationFn: async (data: SocialSignupRequest) => {
            const response = await postSocialSignup(data)
            return response
        },
        onSuccess: data => {
            openModal()
            setIsDelete(false)
        },
        onError: error => {
            openModal()
            setIsDelete(true)
        },
    })
    const handleConfirm = () => {
        closeModal()
        router.push("/auth")
    }

    return { ...mutation, isDelete, closeModal, showModal, handleConfirm }
}
