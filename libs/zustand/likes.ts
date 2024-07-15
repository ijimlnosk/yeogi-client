import { create } from "zustand"
import { LikesState } from "./type"

export const useLikeStore = create<LikesState>(set => ({
    likes: {},
    setLikes: (postId, likes) =>
        set(state => ({
            likes: { ...state.likes, [postId]: likes },
        })),
}))
