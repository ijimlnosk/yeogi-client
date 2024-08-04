import { defaultIcons, handlePostIcons } from "@/constants/floatingBarIcons"
import { create } from "zustand"
import { useFloatingIconStateType } from "./type"

export const useFloatingIconState = create<useFloatingIconStateType>(set => ({
    iconState: defaultIcons || handlePostIcons,
    setIconState: state =>
        set(prev => ({
            iconState: typeof state === "function" ? state(prev.iconState) : state,
        })),
}))
