import { WorldPost } from "@/app/(afterLogin)/user/[userId]/_components/myMap/type"
import create from "zustand"

export type MapStore = {
    unusedPins: WorldPost[]
    usedPins: WorldPost[]
    addUnusedPin: (post: WorldPost) => void
    setUsedPins: (post: WorldPost) => void
    pinCount: number
    incrementPinCount: () => void
    isPinExists?: (postId: number) => boolean
}

export const useMapStore = create<MapStore>((set, get) => ({
    unusedPins: [],
    usedPins: [],
    addUnusedPin: (post: WorldPost) =>
        set(state => ({
            unusedPins: [...state.unusedPins, post],
        })),
    setUsedPins: (posts: WorldPost) =>
        set(state => ({
            unusedPins: state.unusedPins.filter(p => p !== posts),
            usedPins: [...state.usedPins, posts],
        })),
    pinCount: 0,
    incrementPinCount: () =>
        set(state => ({
            pinCount: state.pinCount + 1,
        })),
    isPinExists: (postId: number) => {
        const state = get()
        return state.unusedPins.some(pin => pin.postId === postId) || state.usedPins.some(pin => pin.postId === postId)
    },
}))
