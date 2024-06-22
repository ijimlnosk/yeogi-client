import { UseMutationResult, useMutation } from "@tanstack/react-query"
import { postCommentRequest, postCommentResponse, putCommentRequest, putCommentResponse } from "./type"
import { postComment, putComment } from "@/apis/commentApi"

export const useCreateComment = (
    refetch: () => void,
): UseMutationResult<postCommentResponse, Error, postCommentRequest> => {
    return useMutation<postCommentResponse, Error, postCommentRequest>({
        mutationFn: postComment,
        onSuccess: () => {
            refetch()
        },
    })
}

export const useUpdateComment = (
    refetch: () => void,
): UseMutationResult<putCommentResponse, Error, putCommentRequest> => {
    return useMutation<putCommentResponse, Error, putCommentRequest>({
        mutationFn: putComment,
        onSuccess: () => {
            refetch()
        },
    })
}
