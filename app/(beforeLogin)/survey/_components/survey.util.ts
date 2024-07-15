import { ThemeKeys } from "@/types/theme"

export const calculateTopTags = (tags: string[][]): ThemeKeys[] => {
    const flattenedTags = tags.flat()
    const counts: { [key: string]: number } = {}
    flattenedTags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1
    })

    const sortedTags = Object.entries(counts).sort((a, b) => b[1] - a[1])
    const topTags = sortedTags
        .slice(0, 3)
        .map(([tag]) => tag as ThemeKeys)
        .filter(tag => validTags.includes(tag as ThemeKeys))

    return topTags
}

const validTags: ThemeKeys[] = [
    "EATING",
    "HOT_PLACE",
    "REST",
    "SHOPPING",
    "ACTIVITY",
    "SIGHTSEEING",
    "PACKAGE",
    "LUXURY",
    "COST_SAVING",
]
