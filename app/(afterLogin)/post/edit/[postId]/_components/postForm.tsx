"use client"

import { putPost } from "@/apis/postApi"
import { useCreatePostStore } from "@/libs/zustand/post"
import { UpdatePost } from "@/types/post"
import { formatDate } from "@/utils/date.utils"
import { processContentImages } from "@/utils/setImage.utils"
import UpperSelection from "../../../_components/form/upperSelection"
import ThemeSelection from "../../../_components/form/themeSelection"
import FormBtn from "../../../_components/form/formBtn"
import { PostFormProps } from "./type"
import FreeForm from "./freeForm"
import MemoForm from "./memoForm"
import { useEffect } from "react"

const PostForm = ({ postId, resetAll, isFreeForm, setIsOverlayOpen }: PostFormProps) => {
    const {
        selectedContinent,
        selectedCountry,
        startDate,
        endDate,
        selectedAddress,
        selectedTheme,
        formData,
        setFormData,
        memos,
    } = useCreatePostStore()

    useEffect(() => {
        if (formData.address && !selectedAddress) {
            useCreatePostStore.setState({ selectedAddress: formData.address })
        }
    }, [formData.address, selectedAddress])

    const handleInputChange = <K extends keyof UpdatePost>(field: K, value: UpdatePost[K]) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleUpdate = async () => {
        const postData: UpdatePost = {
            ...formData,
            continent: selectedContinent || formData.continent,
            country: selectedCountry || formData.country,
            address: selectedAddress || formData.address,
            tripStartDate: startDate ? formatDate(startDate) : formData.tripStartDate,
            tripEndDate: endDate ? formatDate(endDate) : formData.tripEndDate,
            themeList:
                selectedTheme && selectedTheme.length > 0
                    ? Array.isArray(selectedTheme)
                        ? selectedTheme
                        : [selectedTheme]
                    : formData.themeList,
            content: isFreeForm ? await processContentImages(formData.content) : "",
            memos: isFreeForm
                ? []
                : await Promise.all(
                      memos.map(async editor => ({
                          memoId: editor.memoId,
                          content: await processContentImages(editor.content),
                          address: selectedAddress || editor.address,
                      })),
                  ),
        }
        await putPost(postId!, postData)
        resetAll()
        window.location.href = `/post/detail/${postId}`
    }

    return (
        <div className="w-[900px] min-h-[1500px] mx-auto bg-SYSTEM-beige flex flex-col">
            <div className={`mb-20 ${isFreeForm ? "" : "w-[900px] h-full"}`}>
                <UpperSelection
                    formText={isFreeForm ? "자유롭게 " : "간단하게 "}
                    postDetail={formData}
                    handleInputChange={handleInputChange}
                />
                {isFreeForm ? (
                    <FreeForm formData={formData} setFormData={setFormData} />
                ) : (
                    <MemoForm formData={formData} />
                )}
                <ThemeSelection postDetail={formData} />
                <FormBtn setIsOverlayOpen={setIsOverlayOpen} handleUpdatePost={handleUpdate} postId={postId} />
            </div>
        </div>
    )
}
export default PostForm
