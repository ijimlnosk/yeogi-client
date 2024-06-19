'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * 라우트 변경 중 로그인 오버레이를 표시할지 확인하는 커스텀 훅
 * 
 * @explanation 라우트가 변경되면 감지하고, 새 URL로 HEAD에 요청
 * @explanation 로그인 오버레이를 표시할지 결정
 * 
 * @param setShowLoginModal - 로그인 모달을 표시하거나 숨기기 위한 함수
 */

const useCheckLoginModal = (setShowLoginModal: Dispatch<SetStateAction<boolean>>) => {
    const router = useRouter();

    useEffect(() => {
        /**
         * HEAD로 url 요청을 보내 로그인 오버레이를 표시할지 확인
         * 
         * @param url - 확인할 url
         * @returns boolean
         */
        const checkLoginModal = async (url: string) => {
                const response = await fetch(url, { method: 'HEAD' });
                if (response.headers.get('x-show-login-modal')) {
                    setShowLoginModal(true);
                    return false;
                }
            return true;
        };

        /**
         * 라우트 변경 시작 이벤트 처리
         * 
         * @params url - 이동할 라우드 URL
         */
        const handleRouteChangeStart = async (url: string) => {
            const shouldNavigate = await checkLoginModal(url);
            if (!shouldNavigate) {
                router.events.emit('routeChangeError');
                throw `Route change to ${url} cancelled`;
            }
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
        };
    }, [router, setShowLoginModal]);
};

export default useCheckLoginModal;
