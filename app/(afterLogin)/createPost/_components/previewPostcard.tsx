import PostCard from "@/components/commons/postCard"
import { PreviewPostCardProps } from "./type"

const PreviewPostCard = ({ selectedContinent, title, selectedImage }: PreviewPostCardProps) => {
    const currentDate = new Date().toISOString()
    return (
        <PostCard
            title={title}
            continent={selectedContinent}
            created_At={currentDate}
            likeCount={0}
            commentCount={0}
            user_nickname="Amy"
            post_id={0}
            user_profile={""}
            thumbnail={selectedImage}
        />
    )
}
export default PreviewPostCard
