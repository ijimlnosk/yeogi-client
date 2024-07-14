import { create } from "zustand"

export type LikesState = {
likes: {[key:number]: number}
setLikes:(postId:number, likes:number)=>void
}

export const useLikeStore = create<LikesState>((set)=>({
    likes:{},
    setLikes:(postId , likes)=> set((state)=>({
        likes:{...state.likes, [postId]:likes}
    }))
}))