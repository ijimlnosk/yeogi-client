import { create } from "zustand"
import { PinStore } from "./type"

export const usePinStore = create<PinStore>(set => ({
    refetch: null,
    setRefetch: refetch => set({ refetch }),
}))
