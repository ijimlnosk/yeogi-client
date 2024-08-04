"use client"

import { useState } from "react"
import { useCommonHandlerProps } from "./type"

const useShareHandler = ({ setIconState }: useCommonHandlerProps) => {
    const [isShareActive, setIsShareActive] = useState<boolean>(false)

    const handleShareClick = async () => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href)
            setIsShareActive(true)
            setTimeout(() => {
                setIsShareActive(false)
                setIconState(prevState =>
                    prevState.map(icon => (icon.name === "share" ? { ...icon, isActive: false } : icon)),
                )
            }, 1000)
        }
    }

    return { isShareActive, handleShareClick }
}
export default useShareHandler
