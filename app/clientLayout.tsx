"use client"

import { ReactNode } from "react"
import { useModalStore } from "@/libs/zustand/modal"
import { useSearchStore } from "@/libs/zustand/search"
import Overlay from "@/components/commons/overlay"
import AuthForm from "./auth/page"
import HeaderSearchModal from "@/components/layouts/_components/headerSearchModal"

/**
 * 전역 상태로 로그인 오버레이 제어
 * @explanation 자식 컴포넌트를 렌더링
 * @explanation 오버레이를 통해 로그인 폼을 표시
 */
const ClientLayout = ({ children }: { children: ReactNode }) => {
    const showLoginModal = useModalStore(state => state.showLoginModal)
    const closeModal = useModalStore(state => state.closeModal)
    const { isSearchOpen } = useSearchStore()

    return (
        <>
            <Overlay isOpen={showLoginModal} onClick={closeModal} rounded="lg">
                {showLoginModal && <AuthForm />}
            </Overlay>
            {isSearchOpen && <HeaderSearchModal />}
            {children}
        </>
    )
}
export default ClientLayout
