import { ThemeKeys } from "@/types/theme"
import { create } from "zustand"

export type ThemeState = {
    showResult: boolean
    setShowResult: (value: boolean) => void
    topTags: ThemeKeys[]
    setTopTags: (tags: ThemeKeys[]) => void
}

export const useThemeStore = create<ThemeState>(set => ({
    showResult: false,
    setShowResult: value => set({ showResult: value }),
    topTags: [],
    setTopTags: tags => set({ topTags: tags }),
}))
