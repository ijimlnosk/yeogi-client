import { useMapStore } from "@/libs/zustand/pin"
import { PostState } from "./type"
import { CreatePost, UpdatePost, memos } from "@/types/post"
import { formatDate } from "@/utils/date.utils"
import { processContentImages } from "@/utils/setImage.utils"
import { setPinLocalStorage } from "@/utils/storage.utils"
import { FormEvent } from "react"
import { postPost, putPost } from "@/apis/postApi"

export const useSubmitHandling = (state: PostState, isFreeForm: boolean, initialData?: UpdatePost) => {
    const handleOverlaySubmit = async (e: FormEvent, memos: memos[]) => {
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
            let newPost
            if (initialData) {
                newPost = await putPost(state.postId!, postData as UpdatePost)
            } else {
                newPost = await postPost(postData as CreatePost)
            }
            const updatedPosts = [newPost, ...state.posts]
            state.setPosts(updatedPosts)
            state.resetFormData()
            state.resetAll()
            state.setIsRouterOverlayOpen(true)
            setPinLocalStorage(String(useMapStore.getState().pinCount + 1))

            localStorage.removeItem("saveData")
        } catch (error) {
            setPinLocalStorage(String(useMapStore.getState().pinCount - 1))
            state.setIsFailModalOpen(true)
        }
    }

    return { handleOverlaySubmit }
}
