/**
 * 공용컴포넌트에서 사용될 type 파일
 */

//postCard props 타입
export type PostCardProps = {
    post_id: number
    title: string
    likeCount: number
    commentCount: number
    continent: string
    user_nickname: string
    user_profile: string
    thumbnail: string
    created_At: Date
}

//calendar props type
export type DateRange = {
    start: Date | null
    end: Date | null
}

export type CalendarProps = {
    onClose: () => void
}

//form overlay props type
export type FormOverlayProps = {
    isContinentOverlayOpen: boolean
    isCalendarOverlayOpen: boolean
    onClose: () => void
    handleContinentSelect: (continent: string) => void
    selectedContinent: string | null
}
