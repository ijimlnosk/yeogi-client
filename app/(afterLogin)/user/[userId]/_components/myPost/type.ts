import { UserInfoProps } from "@/components/layouts/type"
import { Post } from "@/types/post"

export type MyPostProps = {
    userInfo: UserInfoProps
    posts?: Post[]
}
