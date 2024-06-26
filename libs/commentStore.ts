import { create } from "zustand"
import { CommentState, UpdateCommentState } from "./type"

export const useCommentIdStore = create<CommentState>(set => ({
    saveCommentId: 0,
    setSaveCommentId: (saveCommentId: number) => set({ saveCommentId }),
}))

export const useIsUpdateComment = create<UpdateCommentState>(set => ({
    isUpdateComment: false,
    setIsUpdateComment: (isUpdateComment: boolean) => set({ isUpdateComment }),
}))
