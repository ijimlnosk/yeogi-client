const POST_API_URL = "/auth"
const redirect_uri = "http://localhost:3000/auth";
/**
 * @function
 * @param {string} provider - "naver" | "kakao" | "google"
 * @param {string | null} code - oauth 에서받아오는 인가코드
 * @param {string} redirect_uri - redirect_uri
 * @param {string} state - "naver"에서 사용되는  사이트 간 요청 위조 공격 방지를 위해 어플리케이션에서 생성한 상태 토큰값
 * @description oauth로그인 API
 */
const fetchAuthToken = async (provider: string, code: string | null, redirect_uri: string, state?: string | null, method = "POST") => {
    if (!code) {
        throw new Error("코드를 받아오지 못했습니다.");
    }
  const response = await fetch(`${POST_API_URL}/auth/generateToken/${provider}?code=${code}&redirect_uri=${redirect_uri}`, {
        method,
    });
    if (!response.ok) {
        throw new Error("실패하였습니다.");
    }
    const data = await response.json();
    return data;
};

// 인가 코드 가져오는 함수
export const getCodeFromUrl = (): string | null => {
    return new URLSearchParams(window.location.search).get("code");
}

// 네이버 상태 값 가져오는 함수
export const getNaverStateUrl = (): string | null => {
    return new URLSearchParams(window.location.search).get("state");
}

// 백엔드로 인가 코드 post 함수
export const postAuthCode = async (provider: string) => {
    const code = getCodeFromUrl();
    const state = getNaverStateUrl();
    try {
        const data = await fetchAuthToken(provider, code, redirect_uri, state, "POST");
        return data;
    } catch (error) {
        throw error;
    }
};

// 백엔드에서 토큰 값 받아오는 함수
export const getAuthToken = async (provider: string) => {
    const code = getCodeFromUrl();
    try {
        const data = await fetchAuthToken(provider, code, redirect_uri, undefined, "GET");
        return data;
    } catch (error) {
        throw error;
    }
};


