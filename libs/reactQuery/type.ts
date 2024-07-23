import { ContinentType } from "@/types/continent"
import { UpdatePost } from "@/types/post"
import { ThemeKeys } from "@/types/theme"
import { SortConditionType } from "@/types/sortCondition"
import { UseMutationResult } from "@tanstack/react-query"
import { UserRequest } from "@/app/auth/_components/signin/type"

/* post mutation type */
export type useGetPostProps = {
    searchType: "CONTENT"
    sortCondition: SortConditionType
    searchKeyword: string
    continent: ContinentType
    theme: ThemeKeys | ThemeKeys[]
}
export type updatePostProps = {
    postId: number
    editedFields: UpdatePost
}

/* comment mutation type */
export type postCommentResponse = {
    id: number
    content: string
    nickname: string
    createdAt: string
    modifiedAt: string
    likeCount: number
    postId: number
}
export type postCommentRequest = {
    content: string
    postId: number
}
export type putCommentResponse = {
    commentId: number
    content: string
    postId: number
}
export type putCommentRequest = {
    commentId: number
    content: string
    postId: number
}

/* auth */
export type UserResponse = {
    accessToken: string
    refreshToken: string
}
export type SignInProps = {
    email: string
    password: string
}
export type SigninResult = UseMutationResult<UserResponse, Error, UserRequest> & {
    isOpen: boolean
    formState: "success" | "fail" | null
    handleOverlay: (isOpen: boolean, state?: "success" | "fail" | null) => void
}
export type SocialSignupResponse = {
    email: string
    isFirst: boolean
    memberId: number
    token: UserResponse
}
