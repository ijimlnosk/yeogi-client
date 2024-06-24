const POST_API_URL = "/auth"

const fetchAuthToken = async (provider: string, code: string | null, redirect_uri: string, state?: string | null, method = "POST") => {
    if (!code) {
        throw new Error("코드를 받아오지 못했습니다.");
    }
  // const response = await fetch(`${POST_API_URL}/auth/generateToken/${provider}?code=${code}`, {
    //     method,
    // });
    let url = `${POST_API_URL}/generateToken/${provider}?code=${code}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
    if (state) {
        url += `&state=${encodeURIComponent(state)}`;
    }

    const response = await fetch(url, { method });
    console.log(response, "oauthresponse")
    if (!response.ok) {
        const errorResponse = await response.text();
        console.error(`Error response from server: ${errorResponse}`);
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
    const redirect_uri = "http://localhost:3000/auth";
    const state = getNaverStateUrl();
    try {
        const data = await fetchAuthToken(provider, code, redirect_uri, state, "POST");
        console.log(data, "나는데이타데이타데이타-oauthapi");
        return data;
    } catch (error) {
        console.error(error, "ㄷㄱ개개객-oauthapi");
        throw error;
    }
};

// 백엔드에서 토큰 값 받아오는 함수
export const getAuthToken = async (provider: string) => {
    const code = getCodeFromUrl();
    const redirect_uri = "http://localhost:3000/auth";
    try {
        const data = await fetchAuthToken(provider, code, redirect_uri, undefined, "GET");
        console.log(data, `안녕 나는 ${provider} 토큰값이야`);
        return data;
    } catch (error) {
        console.error(error, "토큰 가져오기 실패");
        throw error;
    }
};
