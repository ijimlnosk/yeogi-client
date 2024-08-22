import { Post } from "@/types/post"
import { UserInfoType } from "@/types/user"

export type UserClientProps = {
    initialPosts: Post[]
    initialUser: UserInfoType
}
