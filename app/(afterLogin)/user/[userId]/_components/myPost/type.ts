import { UserInfoType } from "@/types/user"
import { Post } from "@/types/post"

export type MyPostProps = {
    userInfo: UserInfoType
    posts?: Post[]
}
