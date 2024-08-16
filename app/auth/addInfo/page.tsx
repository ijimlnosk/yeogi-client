"use client"

import { useSession } from "next-auth/react"
import AddInfoForm from "../_components/signup/addInfoForm"
import { Session } from "next-auth"
import { isNull } from "@/utils/typeGuard"
import { getCookie } from "cookies-next"

const Page = () => {
    const { data: session } = useSession()

    if (isNull(session)) return
    const userData = changeSessionToFormData(session)
    return <AddInfoForm data={userData} />
}

export default Page

const changeSessionToFormData = (session: Session) => {
    const userData = {
        email: session?.user?.email as string,
        isFirst: getCookie("my-first-login") === "true",
        memberId: parseInt(getCookie("memberId") as string),
        token: session?.accessToken as string,
    }
    return userData
}
