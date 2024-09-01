const MAP_API_URL = "/pins/"

import { fetchFormAPI } from "./api.utils"
import { Pin, postPinsProps, putPinsProps } from "./type"

export const getPins = async (): Promise<Pin[]> => {
    const response = await fetchFormAPI(MAP_API_URL, "", { method: "GET" })
    const data = await response.json()
    return data
}

export const postPins = async ({ postId }: postPinsProps) => {
    const response = await fetchFormAPI(MAP_API_URL, "", { method: "POST", body: JSON.stringify({ postId }) })
    const data = await response.json()
    return data
}

export const putPins = async ({ pinId, pinPosition }: putPinsProps) => {
    await fetchFormAPI(MAP_API_URL, `${pinId}`, {
        method: "PUT",
        body: JSON.stringify(pinPosition),
    })
    return { pinId, pinPosition }
}
