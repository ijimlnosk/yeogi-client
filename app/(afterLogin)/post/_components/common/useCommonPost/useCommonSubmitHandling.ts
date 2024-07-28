"use client"

import { PostState } from "./type"
import { CreatePost, UpdatePost, memos } from "@/types/post"
import { formatDate } from "@/utils/date.utils"
import { processContentImages } from "@/utils/setImage.utils"
import { FormEvent, useCallback } from "react"
import { putPost } from "@/apis/postApi"
import { usePostFetchCreatePost } from "@/libs/queryClient/postQueryClient"

export const useSubmitHandling = (state: PostState, isFreeForm: boolean, initialData?: UpdatePost) => {
    const createPostMutation = usePostFetchCreatePost()

    const handleOverlaySubmit = useCallback(
        async (e: FormEvent, memos: memos[]) => {
            try {
                e.preventDefault()
                const postData: CreatePost = {
                    title: state.formData.title,
                    content: isFreeForm ? await processContentImages(state.formData.content) : "",
                    address: isFreeForm ? state.selectedAddress! : "",
                    memos: isFreeForm
                        ? []
                        : await Promise.all(
                              memos.map(async memo => ({
                                  ...memo,
                                  content: await processContentImages(memo.content),
                                  address: memo.address,
                              })),
                          ),
                    continent: state.selectedContinent || "아시아",
                    country: state.selectedCountry!,
                    tripStartDate: state.startDate ? formatDate(state.startDate) : "",
                    tripEndDate: state.endDate ? formatDate(state.endDate) : "",
                    themeList: state.selectedTheme || [],
                }

                if (initialData) {
                    await putPost(state.postId!, postData as UpdatePost)
                } else {
                    await createPostMutation.mutateAsync(postData)
                }
                state.resetFormData()
                state.resetAll()
                state.setIsRouterOverlayOpen(true)
                localStorage.removeItem("saveData")
            } catch (error) {
                state.setIsFailModalOpen(true)
            }
        },
        [state, isFreeForm, initialData, createPostMutation],
    )

    return { handleOverlaySubmit }
}
