export const calculateTopTags = (tags: string[][]) => {
    const flattenedTags = tags.flat()
    const counts: { [key: string]: number } = {}
    flattenedTags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1
    })

    const sortedTags = Object.entries(counts).sort((a, b) => b[1] - a[1])
    const topTags = sortedTags.slice(0, 3).map(([tag]) => tag)

    return topTags
}
