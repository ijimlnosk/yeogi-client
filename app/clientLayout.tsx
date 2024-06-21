"use client"

import useModalStore from "@/libs/modalStore"
import Overlay from "@/components/commons/overlay"
import { ReactNode } from "react"
import SocialSigninForm from "./(beforeLogin)/_auth/signin/socialSigninForm"

/**
 * 전역 상태로 로그인 오버레이 제어
 * @explanation 자식 컴포넌트를 렌더링
 * @explanation 오버레이를 통해 로그인 폼을 표시
 */
const ClientLayout = ({ children }: { children: ReactNode }) => {
    const showLoginModal = useModalStore(state => state.showLoginModal)
    const closeModal = useModalStore(state => state.closeModal)

    return (
        <>
            <Overlay isOpen={showLoginModal} onClick={closeModal} rounded="lg">
                {showLoginModal && <SocialSigninForm />}
            </Overlay>
            {children}
        </>
    )
}
export default ClientLayout
