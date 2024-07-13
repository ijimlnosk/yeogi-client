import { create } from "zustand"

export type ModalStore = {
    showLoginModal: boolean
    openLoginModal: () => void
    closeModal: () => void
    isDelete: boolean
    setIsDelete: (isDelte: boolean) => void
}

export const useModalStore = create<ModalStore>(set => ({
    showLoginModal: false,
    openLoginModal: () => set({ showLoginModal: true }),
    closeModal: () => set({ showLoginModal: false }),
    isDelete: false,
    setIsDelete: (isDelete: boolean) => set({ isDelete }),
}))
