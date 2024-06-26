import { Location } from "./app/(afterLogin)/detailPost/[postId]/_components/type"

export {}

declare global {
    interface Window {
        locationObj: Location | null
        initMap: () => void
        google: typeof google
        initAutoComplete: () => void
    }
}
