import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query"
import { deletePost, putFreePost } from "@/apis/postApi"
import { Post } from "@/utils/type"
import { updateFreeProps } from "./type"

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
            return putFreePost(postId, editedFields)
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
