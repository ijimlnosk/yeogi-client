export const Continents = [
    "아시아",
    "아프리카",
    "남아메리카",
    "북아메리카",
    "유럽",
    "오세아니아",
    "북극",
    "남극",
] as const

export type Continent = (typeof Continents)[number]
