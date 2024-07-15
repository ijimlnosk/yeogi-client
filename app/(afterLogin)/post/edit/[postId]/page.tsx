"use client"

import { getPostDetail, putPost } from "@/apis/postApi"
import { useCreatePostStore, useUpdatePostDataStore } from "@/libs/zustand/post"
import { UpdatePost } from "@/types/post"
import { formatDate } from "@/utils/date.utils"
import { processContentImages } from "@/utils/form.utils"
import { useEffect, useState } from "react"
import UpperSelection from "../../_components/form/upperSelection"
import AddressSelection from "../../_components/form/addressSelection"
import { QuillEditor } from "../../_components/editor/editorQuill"
import ThemeSelection from "../../_components/form/themeSelection"
import FormBtn from "../../_components/form/formBtn"

const UpdatePage = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [isFreeForm, setIsFreeForm] = useState<boolean>(true)
    const [, setIsOverlayOpen] = useState<boolean>(false)
    const { postId } = useUpdatePostDataStore()
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
        setMemos,
        resetAll,
    } = useCreatePostStore()
    useEffect(() => {
        const fetchUpdate = async () => {
            if (postId) {
                try {
                    const post = await getPostDetail(postId)
                    setFormData(post)
                    setIsFreeForm(post.content !== "")
                    setMemos(post.memos || [])
                    setLoading(false)
                } catch (error) {
                    console.error(error)
                    setLoading(false)
                } finally {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }
        fetchUpdate()
    }, [postId, setFormData, setMemos])
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
            themeList: Array.isArray(selectedTheme) ? selectedTheme : [selectedTheme],
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
    if (loading) {
        return <div>로딩 중...</div>
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
                    <>
                        <AddressSelection index={0} postDetail={formData} />
                        <QuillEditor
                            index={0}
                            isFreeForm={true}
                            postDetail={formData}
                            handleInputChange={handleInputChange}
                        />
                    </>
                ) : (
                    memos.map((_, index) => (
                        <div key={index}>
                            <AddressSelection index={index} postDetail={formData} />
                            <QuillEditor
                                index={index}
                                isFreeForm={false}
                                postDetail={formData}
                                handleInputChange={(field, value) => {
                                    const updatedEditors = [...memos]
                                    updatedEditors[index] = { ...updatedEditors[index], [field]: value }
                                    setMemos(updatedEditors)
                                }}
                            />
                        </div>
                    ))
                )}
                <ThemeSelection postDetail={formData} />
                <FormBtn setIsOverlayOpen={setIsOverlayOpen} handleUpdatePost={handleUpdate} postId={postId} />
            </div>
        </div>
    )
}
export default UpdatePage
