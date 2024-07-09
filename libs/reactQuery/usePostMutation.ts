import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query"
import { deletePost, putFreePost } from "@/apis/postApi"
import { UpdatePost } from "@/types/post"
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

export const useUpdateFreePost = (): UseMutationResult<UpdatePost, Error, updateFreeProps> => {
    const queryClient = useQueryClient()

    return useMutation<UpdatePost, Error, updateFreeProps>({
        mutationFn: async ({ postId, editedFields }: updateFreeProps) => {
            const editedPostData = {
                ...editedFields,
                postId: postId,
            }
            const response = await putFreePost(postId, editedPostData)
            return response as UpdatePost
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
    })
}
