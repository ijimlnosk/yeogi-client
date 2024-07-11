import { UseMutationResult, useMutation } from "@tanstack/react-query"
import { postComment, putComment } from "@/apis/commentApi"
import { postReComment } from "@/apis/recommentApi"
import { postCommentRequest, postCommentResponse, putCommentRequest, putCommentResponse } from "./comment.type"

export const useCreateComment = (
    refetch: (() => void) | undefined,
): UseMutationResult<postCommentResponse, Error, postCommentRequest> => {
    return useMutation<postCommentResponse, Error, postCommentRequest>({
        mutationFn: postComment,
        onSuccess: () => {
            if (refetch) {
                refetch()
            }
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

export const useCreateReComment = (
    refetch: (() => void) | undefined,
): UseMutationResult<postCommentResponse, Error, putCommentRequest> => {
    return useMutation<postCommentResponse, Error, putCommentRequest>({
        mutationFn: postReComment,
        onSuccess: () => {
            if (refetch) {
                refetch()
            }
        },
    })
}
