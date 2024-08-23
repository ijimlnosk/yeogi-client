const MAP_API_URL = "/pins/"

import { promises } from "dns"
import { fetchFormAPI } from "./api.utils"
import { Pin, postPinsProps } from "./type"

export const getPins = async (): Promise<Pin[]> => {
    const response = await fetchFormAPI(MAP_API_URL, "", { method: "GET" })

    const data = await response.json()

    return data
}

export const postPins = async ({ postId }: postPinsProps) => {
    try {
        console.log(postId, "post id")
        const response = await fetchFormAPI(MAP_API_URL, "", { method: "POST", body: JSON.stringify({ postId }) })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}
