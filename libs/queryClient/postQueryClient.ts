import { QueryClient, useMutation, UseMutationResult } from "@tanstack/react-query"
import * as postApi from "@/apis/postApi"
import { CreatePost, Post } from "@/types/post"
import { getPostProps } from "@/apis/type"
import { updatePostProps } from "../reactQuery/type"

export const queryClient = new QueryClient()

export const fetchGetPostDetail = (postId: number) => {
    return queryClient.fetchQuery({
        queryKey: ["post", postId],
        queryFn: () => postApi.getPostDetail(postId),
    })
}

export const useFetchCreatePost = () => {
    return useMutation({
        mutationFn: (newPost: CreatePost) => postApi.postPost(newPost),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
    })
}

export const useFetchGetPost = (): UseMutationResult<Post[], Error, getPostProps, unknown> => {
    return useMutation({
        mutationFn: ({ searchType, searchString, sortCondition, continent, theme }: getPostProps) =>
            postApi.getPost({ searchType, searchString, sortCondition, continent, theme }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
    })
}

export const useFetchUpdatePost = () => {
    return useMutation({
        mutationFn: ({ postId, editedFields }: updatePostProps) => postApi.putPost(postId, editedFields),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
    })
}

export const useFetchDeletePost = () => {
    return useMutation({
        mutationFn: (postId: number) => postApi.deletePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
    })
}

export const fetchMyPosts = () => {
    return queryClient.fetchQuery({
        queryKey: ["myPosts"],
        queryFn: () => postApi.getMyPosts(),
    })
}
