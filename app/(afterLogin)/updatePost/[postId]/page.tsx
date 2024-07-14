"use client"

import { useState, useEffect } from "react"
import { getPostDetail, putPost } from "@/apis/postApi"
import { UpdatePost } from "@/types/post"
import { processContentImages } from "@/utils/form.utils"
import { useCreatePostStore, useUpdatePostDataStore } from "@/libs/zustand/post"
import FormBtn from "../../createPost/_components/form/formBtn"
import ThemeSelection from "../../createPost/_components/form/themeSelection"
import AddressSelection from "../../createPost/_components/form/addressSelection"
import { QuillEditor } from "../../createPost/_components/editor/editorQuill"
import UpperSelection from "../../createPost/_components/form/upperSelection"
import { formatDate } from "@/utils/date.utils"

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
        quillEditors,
        setQuillEditors,
        resetAll,
    } = useCreatePostStore()

    useEffect(() => {
        const fetchUpdate = async () => {
            if (postId) {
                try {
                    const post = await getPostDetail(postId)
                    setFormData(post)
                    setIsFreeForm(post.content !== "")
                    setQuillEditors(post.memos || [])
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
    }, [postId, setFormData, setQuillEditors])

    const handleInputChange = <K extends keyof UpdatePost>(field: K, value: UpdatePost[K]) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleUpdate = async () => {
        try {
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
                          quillEditors.map(async editor => ({
                              ...editor,
                              content: await processContentImages(editor.content),
                              address: selectedAddress || editor.address,
                          })),
                      ),
            }
            console.log("postData", postData)
            await putPost(postId, postData)
            resetAll()
            // window.location.href = `/detailPost/${postId}`
        } catch (error) {
            console.error("Error updating post:", error)
        }
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
                    quillEditors.map((editor, index) => (
                        <div key={index}>
                            <AddressSelection index={index} postDetail={formData} />
                            <QuillEditor
                                index={index}
                                isFreeForm={false}
                                postDetail={formData}
                                handleInputChange={(field, value) => {
                                    const updatedEditors = [...quillEditors]
                                    updatedEditors[index] = { ...updatedEditors[index], [field]: value }
                                    setQuillEditors(updatedEditors)
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
