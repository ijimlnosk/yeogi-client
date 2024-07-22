import { logout } from "@/apis/auth/oauthApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

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
