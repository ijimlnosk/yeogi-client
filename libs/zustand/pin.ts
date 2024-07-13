import { create } from "zustand"

export type MapStore = {
    pinCount: number
    incrementPinCount: () => void
    decrementPinCount: () => void
}

export const useMapStore = create<MapStore>(set => ({
    pinCount: 0,
    incrementPinCount: () =>
        set(state => ({
            pinCount: state.pinCount + 1,
        })),
    decrementPinCount: () =>
        set(state => ({
            pinCount: state.pinCount - 1,
        })),
}))
