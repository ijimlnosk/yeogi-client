import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { SocialSignupRequest } from "@/app/auth/_components/signup/type"
import { postSocialSignup } from "@/apis/auth/socialSignup"
import { SocialSignupResponse } from "./type"
import { useRouter } from "next/navigation"

const useSocialSignup = () => {
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

export default useSocialSignup
