export const Continent: ContinentType = {
    ASIA: "아시아",
    AFRICA: "아프리카",
    SOUTH_AMERICA: "남아메리카",
    NORTH_AMERICA: "북아메리카",
    EUROPE: "유럽",
    OCEANIA: "오세아니아",
    NORTH_POLE: "북극",
    SOUTH_POLE: "남극",
} as const

export type Continent = (typeof Continent)[keyof typeof Continent]

export type ContinentType = {
    [key: string]: string
}
