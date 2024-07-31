import { Post } from "@/types/post"
import { MyUserInfoType } from "@/types/user"

export type MyPostProps = {
    userInfo: MyUserInfoType
    myPosts: Post[]
}
