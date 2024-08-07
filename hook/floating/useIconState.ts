"use client"

import { FloatingIcon } from "@/app/(afterLogin)/post/detail/[postId]/_components/floating/type"
import { useState } from "react"

const useIconState = (initialIcons: FloatingIcon[]) => {
    const [iconState, setIconState] = useState<FloatingIcon[]>(initialIcons)
    return { iconState, setIconState }
}
export default useIconState
