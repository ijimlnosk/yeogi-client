export type ThemeProps =
    | "REST"
    | "EATING"
    | "HOT_PLACE"
    | "SHOPPING"
    | "ACTIVITY"
    | "SIGHTSEEING"
    | "PACKAGE"
    | "LUXURY"
    | "COST_SAVING"

export type SortConditionType = "LIKES" | "VIEWS" | "RECENT"

export type PolaroidProps = {
    step: string
    src: { src: string; width: number; height: number }
    alt: string
    description: string
    spanText: string
    textColor: string
    rotateFront?: string
    rotateBack?: string
    className?: string
}

export type RecommendPaginationProps = {
    currentPage: number
    totalPages: number
    onChangePage: (direction: "prev" | "next") => void
}
