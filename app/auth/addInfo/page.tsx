"use client"

import { useSession } from "next-auth/react"
import AddInfoForm from "../_components/signup/addInfoForm"
import { Session } from "next-auth"
import { isNull } from "@/utils/typeGuard"

const Page = () => {
    const { data: session } = useSession()

    if (isNull(session)) return
    const userData = changeSessionToFormData(session)
    return <AddInfoForm data={userData} />
}

export default Page

export function getCookie(name: string): string | null {
    if (typeof window !== "undefined") {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)

        if (parts.length === 2) {
            const cookiePart = parts.pop()
            if (cookiePart) {
                return cookiePart.split(";").shift() || null
            }
        }
    }
    return null
}

const changeSessionToFormData = (session: Session) => {
    const userData = {
        email: session?.user?.email as string,
        isFirst: getCookie("my-first-login") === "true",
        memberId: parseInt(getCookie("memberId") as string),
        token: session?.accessToken as string,
    }
    return userData
}
