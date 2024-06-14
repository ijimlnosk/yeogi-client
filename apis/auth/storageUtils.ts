export const setSessionToken = (token: string): void => {
    sessionStorage.setItem("accessToken", token);
};

export const getSessionToken = () => {
    return sessionStorage.getItem("accessToken");
};
