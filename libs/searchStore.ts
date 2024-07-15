import { create } from "zustand"
import { SearchState } from "./type"

export const useSearchStore = create<SearchState>(set => ({
    isSearchOpen: false,
    setIsSearchOpen: (isSearchOpen: boolean) => set({ isSearchOpen }),
}))
