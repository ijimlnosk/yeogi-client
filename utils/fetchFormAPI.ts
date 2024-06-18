export const fetchFormAPI = async (api: string, endPoint: string, options: RequestInit) => {
    const response = await fetch(`${api}/${endPoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
        credentials: "include",
    })
    if (!response.ok) {
        throw new Error("response not ok")
    }
    return response
}
