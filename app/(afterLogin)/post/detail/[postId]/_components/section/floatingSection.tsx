import FloatingBar from "../floating/floatingBar"
import { defaultIcons, handlePostIcons } from "@/constants/floatingBarIcons"
import { FloatingSectionProps } from "./type"

const FloatingSection = ({ postId, post }: FloatingSectionProps) => {
    return (
        <div className="relative flex flex-col items-center justify-center py-10">
            <FloatingBar icons={defaultIcons} />
            <FloatingBar icons={handlePostIcons} isMine={true} postId={postId} post={post} />
        </div>
    )
}
export default FloatingSection
