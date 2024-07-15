import { create } from "zustand"
import { MapStore } from "./type"

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
