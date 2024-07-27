import { Post } from "@/types/post"
import { SortConditionType } from "@/types/sortCondition"

export type FilterTabsProps = {
    selectedIndex: number | number[] | null
    setSelectedIndex: (selectedIndex: number) => void
}

export type postSectionProps = {
    filteredPosts: Post[]
    totalPages: number
    currentPage: number
    sortCondition: SortConditionType
}
