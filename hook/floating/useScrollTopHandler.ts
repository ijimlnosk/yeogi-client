"use client"

import { useEffect, useState } from "react"
import { useCommonHandlerProps } from "./type"

const useScrollTopHandler = ({ setIconState }: useCommonHandlerProps) => {
    const [isScrollActive, setIsScrollActive] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 0
            setIsScrollActive(scrolled)
            if (!scrolled) {
                setIconState(prevState =>
                    prevState.map(icon => (icon.name === "arrow" ? { ...icon, isActive: false } : icon)),
                )
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [setIconState])

    const handleScrollTopClick = () => {
        if (isScrollActive) {
            setIconState(prevState =>
                prevState.map(icon => (icon.name === "arrow" ? { ...icon, isActive: true } : icon)),
            )
            window.scrollTo({ top: 0, behavior: "smooth" })

            setTimeout(() => {
                setIconState(prevState =>
                    prevState.map(icon => (icon.name === "arrow" ? { ...icon, isActive: false } : icon)),
                )
            }, 300)
        }
    }

    return { isScrollActive, handleScrollTopClick }
}

export default useScrollTopHandler
