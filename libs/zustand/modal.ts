import { create } from "zustand"
import { ModalStore } from "./type"

export const useModalStore = create<ModalStore>(set => ({
    showLoginModal: false,
    showModal: false,
    openModal: () => set({ showModal: true }),
    openLoginModal: () => set({ showLoginModal: true }),
    closeModal: () => set({ showModal: false, showLoginModal: false }),
    isDelete: false,
    setIsDelete: (isDelete: boolean) => set({ isDelete }),
}))
