import { DetailPost } from "@/utils/type"

export type PostDetailProps = {
    post: DetailPost
}

export type Location = {
    lat: number
    lng: number
}

export type MapDivProps = {
    location: Location | null
}
