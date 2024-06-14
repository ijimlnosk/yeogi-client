const API_URL = "/posts"

export const getUserInfo = async () => {
    const response = await fetch(`${API_URL}/member`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
    })
    if (!response.ok) {
        throw new Error("response not ok")
    }
    const data = await response.json()
    return data
}
