import { QueryClient, useMutation } from "@tanstack/react-query"
import * as postApi from "@/apis/postApi"
import { CreatePost } from "@/types/post"

export const queryClient = new QueryClient()

export const getFetchPostDetail = (postId: number) => {
    return queryClient.fetchQuery({
        queryKey: ["post", postId],
        queryFn: () => postApi.getPostDetail(postId),
    })
}

export const usePostFetchCreatePost = () => {
    return useMutation({
        mutationFn: (newPost: CreatePost) => postApi.postPost(newPost),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
    })
}
