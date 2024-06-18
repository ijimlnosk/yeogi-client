import create from 'zustand';
import { ModalStore } from './type';

const useModalStore = create<ModalStore>((set) => ({
    showLoginModal: false,
    openLoginModal: () => set({ showLoginModal: true }),
    closeModal: () => set({ showLoginModal: false }),
}));

export default useModalStore;
