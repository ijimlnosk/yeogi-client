import PostCard from "@/components/commons/postCard"
import { PreviewPostCardProps } from "./type"

const PreviewPostCard = ({ selectedImage }: PreviewPostCardProps) => {
    return (
        <PostCard
            title={"post title"}
            continent={"유럽"}
            created_At={new Date("2023-06-05T14:48:00.000Z")}
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
