"use client"

import { useEffect, useState, MouseEvent, ReactNode } from "react"
import { useRouter } from "next/navigation"
import useModalStore from "@/libs/modalStore"

type ProtectedLinkProps = {
    href: string
    children: ReactNode
}

/**
 *  클릭 시 로그인 여부를 확인하는 컴포넌트
 * @explanation 인증되지 않은 사용자 접근 시, 로그인 오버레이를 띄운다
 * @explanation 로그인 된 사용자는 원하는 페이지로 이동 가능하다
 *
 * @param {string} href - 이동할 경로
 * @param {ReactNode} props.children - 자식 컴포넌트
 */
const ProtectedLink = ({ href, children }: ProtectedLinkProps) => {
    const [isClient, setIsClient] = useState(false)
    const openLoginModal = useModalStore(state => state.openLoginModal)
    const router = useRouter()

    /**
     * @explanation 컴포넌트가 클라이언트 측에서 렌더링 되어있음을 확인하기 위해 true로 설정
     */
    useEffect(() => {
        setIsClient(true)
    }, [])

    /**
     * 링크 클릭 이벤트 처리하는 함수
     * @explanation 로그인 오버레이 표시 여부 확인
     * @explanation 필요하면 오버레이를 띄우고, 아니면 페이지 이동
     *
     * @param {MouseEvent<HTMLAnchorElement | HTMLButtonElement>} e - 클릭된 이벤트 객체
     */
    const handleClick = async (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        e.preventDefault()
        if (isClient) {
            try {
                const response = await fetch(href, { method: "HEAD" })
                if (response.headers.get("x-show-login-modal")) {
                    openLoginModal()
                } else {
                    router.push(href)
                }
            } catch (error) {
                router.push(href)
            }
        }
    }

    return (
        <a href={href} onClick={handleClick}>
            {children}
        </a>
    )
}

export default ProtectedLink
