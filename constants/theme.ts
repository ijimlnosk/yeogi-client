export const Theme: ThemeType = {
    REST: "휴식",
    HOT_PLACE: "핫 플레이스",
    PACKAGE: "패키지",
    SHOPPING: "쇼핑",
    EATING: "맛집",
    SIGHTSEEING: "관광",
    ACTIVITY: "액티비티",
} as const

export type Theme = (typeof Theme)[keyof typeof Theme]

export type ThemeType = {
    [key: string]: string
}
