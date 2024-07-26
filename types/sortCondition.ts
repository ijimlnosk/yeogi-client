export type Sort = {
    key: string
    label: string
}

export type SortConditionType = "LIKES" | "VIEWS" | "RECENT"

export type SortDropdownProps = {
    initialValue?: SortConditionType
}

export const sorts: Sort[] = [
    { key: "RECENT", label: "최신순" },
    { key: "VIEWS", label: "조회순" },
    { key: "LIKES", label: "좋아요순" },
]

export const isSortConditionType = (value: string): value is SortConditionType => {
    return ["RECENT", "VIEWS", "LIKES"].includes(value)
}
