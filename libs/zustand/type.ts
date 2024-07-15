import { UserInfoProps } from "@/components/layouts/type"
import { ContinentType } from "@/types/continent"
import { CreatePost, Post, memos, UpdatePost } from "@/types/post"
import { ThemeKeys } from "@/types/theme"
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
    selectedContinent: ContinentType | null
    selectedCountry: string | null
    startDate: Dayjs | null
    endDate: Dayjs | null
    selectedTheme: ThemeKeys[]
    selectedAddress: string | null
    setSelectedContinent: (continent: ContinentType | null) => void
    setSelectedCountry: (country: string | null) => void
    setStartDate: (date: Dayjs | null) => void
    setEndDate: (date: Dayjs | null) => void
    setSelectedTheme: (themeList: ThemeKeys[]) => void
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
    postId: number | null
    postDetail: UpdatePost | null
    setPostId: (postId: number) => void
    setPostDetail: (postDetail: UpdatePost | null) => void
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

/* post & comment likes */
export type LikesState = {
    likes: { [key: number]: number }
    setLikes: (postId: number, likes: number) => void
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
    topTags: ThemeKeys[]
    setTopTags: (tags: ThemeKeys[]) => void
}

/* search */
export type SearchState = {
    isSearchOpen: boolean
    setIsSearchOpen: (isSearchOpen: boolean) => void
}
