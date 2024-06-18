import { getPinProps, postPinProps } from "./type"

const MAP_API_URL = "/pins"

export const getPin = async ({ email }: getPinProps) => {
    const response = await fetch(`${MAP_API_URL}/pins/${email}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
    })
    if (!response.ok) throw new Error("pin을 가져오는데 실패했어요...🥹")
    const data = await response.json()

    return data
}

export const postPin = async (pin: postPinProps) => {
    const response = await fetch(`${MAP_API_URL}/pin`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
        body: JSON.stringify(pin),
    })
    if (!response.ok) {
        const errorText = await response.text()
        console.error("Response error:", response.status, errorText)
        throw new Error("핀 꽂기 실패")
    }
    try {
        const data = await response.json()
        return data
    } catch (error) {
        console.error("json 파싱 오류", error)
        return undefined
    }
}
