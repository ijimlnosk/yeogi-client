import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query"
import { deletePost, getPost, putPost } from "@/apis/postApi"
import { Post, UpdatePost } from "@/types/post"
import { updatePostProps, useGetPostProps } from "./type"

export const useGetPost = (): UseMutationResult<Post[], Error, useGetPostProps> => {
    const queryClient = useQueryClient()

    return useMutation<Post[], Error, useGetPostProps>({
        mutationFn: ({ searchType, sortCondition, searchKeyword, theme }: useGetPostProps) =>
            getPost({
                searchType,
                searchString: searchKeyword,
                sortCondition,
                theme,
            }),
        onSuccess: data => {
            queryClient.setQueryData(["posts"], data)
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
