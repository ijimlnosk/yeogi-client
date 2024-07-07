import { create } from "zustand"
import { ThemeState } from "./type"

export const useThemeStore = create<ThemeState>(set => ({
    showResult: false,
    setShowResult: value => set({ showResult: value }),
    topTags: [],
    setTopTags: tags => set({ topTags: tags }),
}))
