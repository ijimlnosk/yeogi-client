import { useRouter } from "next/router"

export function usePostDetail() {
    const router = useRouter()
    const postId = router.query.postId as string

    console.log(router)

    if (!postId) {
        throw new Error("PostId not found")
    }

    return postId
}
