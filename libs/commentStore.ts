import { create } from "zustand"
import { CommnetState, CreateCommentState, UpdateCommentState } from "./type"

export const useCommentIdStore = create<CommnetState>(set => ({
    saveCommentId: 0,
    setSaveCommentId: (saveCommentId: number) => set({ saveCommentId }),
}))

export const useUpdateComment = create<UpdateCommentState>(set => ({
    isUpdateComment: false,
    setIsUpdateComment: (isUpdateComment: boolean) => set({ isUpdateComment }),
    updatedContent: "",
    setUpdatedContent: content => set({ updatedContent: content }),
}))

export const useCommentStore = create<CreateCommentState>(set => ({
    comments: [],
    setComments: comments => set({ comments }),
    addComment: newComment => set(state => ({ comments: [newComment, ...state.comments] })),
    updateComment: updateComment =>
        set(state => ({
            comments: state.comments.map(comment => (comment.id === updateComment.id ? updateComment : comment)),
        })),
}))
