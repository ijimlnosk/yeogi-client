import { fetchFormAPI } from "../utils/fetchFormAPI"
import { getPinProps, postPinProps } from "./type"

const MAP_API_URL = "/pins"

/**
 * @function
 * @param {getPinProps} string - user email
 * @description 사용된 핀을 가져오는 api
 */
export const getPin = async (email: getPinProps) => {
    if (email === undefined) return

    const response = await fetchFormAPI(MAP_API_URL, `pins/${email}`, { method: "GET" })

    try {
        const data = await response.json()
        return data
    } catch {
        throw new Error("json 파싱 오류")
    }
}

/**
 * @function
 * @param {postPinProps} props.postPinProps - pin
 * @description 핀을 등록하는 api
 */
export const postPin = async ({ x, y, email, postId }: postPinProps) => {
    const response = await fetchFormAPI(MAP_API_URL, "pin", {
        method: "POST",
        body: JSON.stringify({ x: x, y: y, email: email, postId: postId }),
    })
    console.log(await response.json())
    try {
        const data = await response.json()
        return { x, y, email, postId }
    } catch {
        throw new Error("json 파싱 오류입니다...🥹")
    }
}
