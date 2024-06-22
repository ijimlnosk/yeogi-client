import { deletePost, putFreePost } from "@/apis/postApi"
import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query"
import { updateFreeProps } from "./type"
import { Post } from "@/utils/type"

export const useDeletePost = (): UseMutationResult<void, Error, number> => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, number>({
        mutationFn: (postId: number) => deletePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
    })
}

export const useUpdateFreePost = () => {
    const queryClient = useQueryClient()

    return useMutation<Post, Error, updateFreeProps>({
        mutationFn: ({ postId, editedFields }: updateFreeProps) => {
            const editedPost: Post = {
                ...editedFields,
            }
            return putFreePost(postId, editedPost)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
        onError: error => {
            console.error("Error updating post:", error)
            alert("🔴 게시글 수정에 실패했어요...")
        },
    })
}
