import { ThemeProps } from "@/app/_components/type"
import { UserInfoProps } from "@/components/layouts/type"
import { Continent } from "@/constants/continents"
import { CreatePost, Post, memos } from "@/types/post"
import { Theme } from "@/types/theme"
import { Dayjs } from "dayjs"

// create & update post
export type CreatePostState = {
    // formData 관련 상태
    formData: CreatePost
    posts: CreatePost[]
    memos: memos[]
    setFormData: (data: CreatePost) => void
    setPosts: (posts: CreatePost[]) => void
    setMemos: (memos: memos[]) => void
    resetFormData: () => void
    // selection 관련 상태
    selectedContinent: Continent | null
    selectedCountry: string | null
    startDate: Dayjs | null
    endDate: Dayjs | null
    selectedTheme: Theme[]
    selectedAddress: string | null
    setSelectedContinent: (continent: Continent | null) => void
    setSelectedCountry: (country: string | null) => void
    setStartDate: (date: Dayjs | null) => void
    setEndDate: (date: Dayjs | null) => void
    setSelectedTheme: (themeList: Theme[]) => void
    setSelectedAddress: (address: string) => void
    // 전체 상태 초기화 함수
    resetAll: () => void
}
// post detail
export type PostDataState = {
    postId: number
    postDetail: Post | null
    setPostId: (postId: number) => void
    setPostDetail: (postDetail: Post | null) => void
}
// update post
export type UpdatePostDataState = {
    postId: number
    postDetail: Post | null
    setPostId: (postId: number) => void
    setPostDetail: (postDetail: Post | null) => void
}

/* post & comment likes */
export type LikesState = {
    likes: { [key: number]: number }
    setLikes: (postId: number, likes: number) => void
}

/* comment */
export type CommentState = {
    saveCommentId: number
    setSaveCommentId: (saveCommentId: number) => void
}
export type UpdateCommentState = {
    isUpdateComment: boolean
    setIsUpdateComment: (isUpdateComment: boolean) => void
}
export type CreateCommentProps = {
    id: number
    content: string
    nickname: string
    likeCount: number
    createdAt: string
    postId: number
}
export type CreateCommentState<> = {
    comments: CreateCommentProps[]
    setComments: (comments: CreateCommentProps[]) => void
    addComment: (newComment: CreateCommentProps) => void
    updateComment: (updateComment: CreateCommentProps) => void
}

/* modal */
export type ModalStore = {
    showLoginModal: boolean
    openLoginModal: () => void
    closeModal: () => void
    isDelete: boolean
    setIsDelete: (isDelte: boolean) => void
}

/* user */
export type LoginState = {
    isLoggedIn: boolean
    isLoading?: boolean
    setIsLoggedIn: (isLoggedIn: boolean) => void
    userInfo: UserInfoProps | undefined
    setUserInfo: (userInfo: UserInfoProps) => void
}

/* map */
export type MapStore = {
    pinCount: number
    incrementPinCount: () => void
    decrementPinCount: () => void
}

/* theme */
export type ThemeState = {
    showResult: boolean
    setShowResult: (value: boolean) => void
    topTags: ThemeProps[]
    setTopTags: (tags: ThemeProps[]) => void
}
