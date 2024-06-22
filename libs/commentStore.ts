import { create } from "zustand"
import { CommnetState, UpdateCommentState } from "./type"

export const useCommentIdStore = create<CommnetState>(set => ({
    saveCommentId: 0,
    setSaveCommentId: (saveCommentId: number) => set({ saveCommentId }),
}))

export const useIsUpdateComment = create<UpdateCommentState>(set => ({
    isUpdateComment: false,
    setIsUpdateComment: (isUpdateComment: boolean) => set({ isUpdateComment }),
}))
