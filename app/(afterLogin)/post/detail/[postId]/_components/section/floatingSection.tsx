"use client"

import FloatingBar from "../floating/floatingBar"
import { defaultIcons, handlePostIcons } from "@/constants/floatingBarIcons"
import { FloatingSectionProps } from "./type"

const FloatingSection = ({ postId, post, isMine }: FloatingSectionProps) => {
    return (
        <div className="relative flex flex-col items-center justify-center py-10">
            <FloatingBar postId={postId} post={post} icons={defaultIcons} isMine={false} />
            {isMine && <FloatingBar icons={handlePostIcons} isMine={isMine} postId={postId} post={post} />}
        </div>
    )
}
export default FloatingSection
