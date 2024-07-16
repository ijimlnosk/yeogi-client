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
