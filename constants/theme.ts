export const Theme = ["먹방", "핫플", "휴식", "쇼핑", "액티비티", "관광", "패키지"] as const

export type Theme = (typeof Theme)[number]
