import { WorldPost } from "@/app/(afterLogin)/user/[userId]/_components/myMap/type"
import create from "zustand"

export type MapStore = {
    pins: WorldPost[]
    pinCount: number
    setPins: (pins: WorldPost[]) => void
    incrementPinCount: () => void
}

export const useMapStore = create<MapStore>(set => ({
    pins: [],
    pinCount: 0,
    setPins: pins => {
        set(state => {
            if (arraysAreEqual(state.pins, pins)) return state
            return { ...state, pins }
        })
    },
    incrementPinCount: () => set(state => ({ pinCount: state.pinCount + 1 })),
}))

// 배열 비교 함수 (무한루프 방지)
export function arraysAreEqual(arr1: WorldPost[], arr2: WorldPost[]): boolean {
    if (arr1.length !== arr2.length) return false
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].id !== arr2[i].id) return false
    }
    return true
}
