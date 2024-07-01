import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query"
import { deletePost, putFreePost } from "@/apis/postApi"
import { CreatePost } from "@/utils/type"
import { updateFreeProps } from "./type"
import { initialFormData } from "@/apis/type"

export const useDeletePost = (): UseMutationResult<void, Error, number> => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, number>({
        mutationFn: (postId: number) => deletePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
    })
}

export const useUpdateFreePost = (): UseMutationResult<CreatePost, Error, updateFreeProps> => {
    const queryClient = useQueryClient()

    return useMutation<CreatePost, Error, updateFreeProps>({
        mutationFn: async ({ postId, editedFields }: updateFreeProps) => {
            const editedPostData = {
                ...initialFormData,
                ...editedFields,
                postId: postId,
            }

            const response = await putFreePost(postId, editedPostData)

            return response as CreatePost
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
    })
}
