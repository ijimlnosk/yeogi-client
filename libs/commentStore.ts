import { create } from "zustand"
import { CommnetState } from "./type"

export const useCommentIdStore = create<CommnetState>(set => ({
    saveCommentId: 0,
    setSaveCommentId: (saveCommentId: number) => set({ saveCommentId }),
}))
