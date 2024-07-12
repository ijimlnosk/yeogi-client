import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query"
import { deletePost, getPost, putFreePost } from "@/apis/postApi"
import { updateFreeProps, useGetPostProps } from "./type"
import { Post, UpdatePost } from "@/types/post"

export const useGetPost = (): UseMutationResult<Post[], Error, useGetPostProps> => {
    const queryClient = useQueryClient()

    return useMutation<Post[], Error, useGetPostProps>({
        mutationFn: ({ sortCondition, searchKeyword, searchTheme }: useGetPostProps) =>
            getPost({
                searchType: "CONTENT",
                searchString: searchKeyword,
                sortCondition: sortCondition,
                theme: searchTheme,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
    })
}

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
