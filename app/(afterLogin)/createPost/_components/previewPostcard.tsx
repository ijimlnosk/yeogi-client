import PostCard from "@/components/commons/postCard"

type PreviewPostCardProps = {
    selectedImage: string | null
}

const PreviewPostCard = ({ selectedImage }: PreviewPostCardProps) => {
    return (
        <div className="w-[360px] h-[381px] rounded-3xl overflow-hidden">
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
        </div>
    )
}
export default PreviewPostCard
