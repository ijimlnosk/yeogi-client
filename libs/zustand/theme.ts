import { create } from "zustand"
import { ThemeProps } from "@/types/theme"

export type ThemeState = {
    showResult: boolean
    setShowResult: (value: boolean) => void
    topTags: ThemeProps[]
    setTopTags: (tags: ThemeProps[]) => void
}

export const useThemeStore = create<ThemeState>(set => ({
    showResult: false,
    setShowResult: value => set({ showResult: value }),
    topTags: [],
    setTopTags: tags => set({ topTags: tags }),
}))
