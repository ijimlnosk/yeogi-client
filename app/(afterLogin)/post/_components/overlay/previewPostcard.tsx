import PostCard from "@/components/commons/postCard"
import { PreviewPostCardProps } from "./type"
import { useLoggedIn } from "@/libs/zustand/login"
import defaultProfile from "@/public/images/user/sampleProfile.svg"

const PreviewPostCard = ({ selectedCountry, title, selectedImage }: PreviewPostCardProps) => {
    const { userInfo } = useLoggedIn()
    const currentDate = new Date().toISOString()

    return (
        <PostCard
            title={title}
            country={selectedCountry}
            created_At={currentDate}
            likeCount={0}
            commentCount={0}
            user_nickname={userInfo?.nickname ?? ""}
            post_id={0}
            profile={userInfo?.profile || defaultProfile}
            thumbnail={selectedImage}
        />
    )
}
export default PreviewPostCard
