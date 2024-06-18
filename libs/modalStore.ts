import { create } from "zustand"
import { ModalState } from "./type"

export const useModalStore = create<ModalState>(set => ({
    isDelete: false,
    setIsDelete: (isDelete: boolean) => set({ isDelete }),
}))
