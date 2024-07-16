export type ThemeKeys =
    | "REST"
    | "EATING"
    | "HOT_PLACE"
    | "SHOPPING"
    | "ACTIVITY"
    | "SIGHTSEEING"
    | "PACKAGE"
    | "LUXURY"
    | "COST_SAVING"

export const Theme: ThemeType = {
    REST: "휴식",
    HOT_PLACE: "인기명소",
    PACKAGE: "패키지",
    SHOPPING: "쇼핑",
    EATING: "맛집",
    SIGHTSEEING: "관광",
    ACTIVITY: "액티비티",
    LUXURY: "초호화",
    COST_SAVING: "가성비",
} as const

export type Theme = (typeof Theme)[keyof typeof Theme]

export type ThemeType = {
    [key: string]: string
}
