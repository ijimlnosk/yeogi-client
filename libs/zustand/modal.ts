import { create } from "zustand"
import { ModalStore } from "./type"

export const useModalStore = create<ModalStore>(set => ({
    showLoginModal: false,
    openLoginModal: () => set({ showLoginModal: true }),
    closeModal: () => set({ showLoginModal: false }),
    isDelete: false,
    setIsDelete: (isDelete: boolean) => set({ isDelete }),
}))
