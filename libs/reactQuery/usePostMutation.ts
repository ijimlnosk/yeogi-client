import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query"
import { deletePost, putPost } from "@/apis/postApi"
import { UpdatePost } from "@/types/post"
import { updatePostProps } from "./type"

export const useDeletePost = (): UseMutationResult<void, Error, number> => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, number>({
        mutationFn: (postId: number) => deletePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
    })
}

export const useUpdateFreePost = (): UseMutationResult<UpdatePost, Error, updatePostProps> => {
    const queryClient = useQueryClient()

    return useMutation<UpdatePost, Error, updatePostProps>({
        mutationFn: async ({ postId, editedFields }: updatePostProps) => {
            const editedPostData = {
                ...editedFields,
                postId: postId,
            }
            const response = await putPost(postId, editedPostData)
            return response as UpdatePost
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
    })
}
