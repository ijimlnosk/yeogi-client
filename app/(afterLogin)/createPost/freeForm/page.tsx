"use client"

import { useEffect } from "react"
import CommonPost from "../_components/commonPost"
import { useFormDataStore } from "@/libs/store"

const Page = () => {
    const { resetFormData } = useFormDataStore()
    useEffect(() => {
        resetFormData()
    }, [])

    return <CommonPost isFreeForm={true} shortPosts={[]} />
}

export default Page
