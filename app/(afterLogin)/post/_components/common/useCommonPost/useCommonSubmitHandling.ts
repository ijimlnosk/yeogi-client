"use client"

import { PostState } from "./type"
import { CreatePost, UpdatePost, memos } from "@/types/post"
import { formatDate } from "@/utils/date.utils"
import { processContentImages } from "@/utils/setImage.utils"
import { FormEvent, useCallback } from "react"
import { useFetchCreatePost, useFetchUpdatePost } from "@/libs/queryClient/postQueryClient"
import { postPins } from "@/apis/mapApi"
import { getMyPosts } from "@/apis/postApi"

export const useSubmitHandling = (state: PostState, isFreeForm: boolean, initialData?: UpdatePost) => {
    const createPostMutation = useFetchCreatePost()
    const updatePostMutation = useFetchUpdatePost()
    useFetchUpdatePost
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
                    await updatePostMutation.mutateAsync({ postId: state.postId, editedFields: postData })
                } else {
                    await createPostMutation.mutateAsync(postData)

                    const myPosts = await getMyPosts()
                    const latestPostId = myPosts.length > 0 ? myPosts[0].postId : null

                    if (latestPostId) {
                        // 해당 postId로 postPins 실행
                        await postPins({ postId: latestPostId })
                    }
                }
                state.resetFormData()
                state.resetAll()
                state.setIsRouterOverlayOpen(true)
                localStorage.removeItem("saveData")
            } catch {
                state.setIsFailModalOpen(true)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state, isFreeForm, initialData, createPostMutation],
    )

    return { handleOverlaySubmit }
}
