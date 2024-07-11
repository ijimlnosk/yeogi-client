"use client"

import { useState, useEffect } from "react"
import { getPostDetail, putPost } from "@/apis/postApi"
import { UpdatePost } from "@/types/post"
import { processContentImages } from "@/utils/form.utils"
import { useUpdatePostDataStore, useUpdatePostStore } from "@/libs/zustand/post"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import FormBtn from "../../createPost/_components/form/formBtn"
import ThemeSelection from "../../createPost/_components/form/themeSelection"
import AddressSelection from "../../createPost/_components/form/addressSelection"
import { QuillEditor } from "../../createPost/_components/editor/editorQuill"
import UpperSelection from "../../createPost/_components/form/upperSelection"

dayjs.extend(utc)

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
    } = useUpdatePostStore()

    useEffect(() => {
        // const searchParams = new URLSearchParams(window.location.search)
        // const postId = searchParams.get("id")
        const fetchUpdate = async () => {
            if (postId) {
                try {
                    console.log("Fetching post details...")
                    const post = await getPostDetail(postId)
                    console.log("Post details fetched:", post)
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
    }, [setFormData, setQuillEditors])

    const handleInputChange = <K extends keyof UpdatePost>(field: K, value: UpdatePost[K]) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleUpdate = async () => {
        try {
            const postData: UpdatePost = {
                ...formData,
                content: "",
                continent: selectedContinent || "",
                region: selectedCountry || "",
                address: selectedAddress || "",
                memos: [],
                tripStartDate: startDate
                    ? dayjs(startDate).startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS[z]")
                    : formData.tripEndDate,
                tripEndDate: endDate
                    ? dayjs(endDate).startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS[z]")
                    : formData.tripEndDate,
                themeList: Array.isArray(selectedTheme) ? selectedTheme : [selectedTheme],
            }

            console.log(postData, "post data")
            if (postData.content) {
                const processedContent = await processContentImages(formData.content!)
                postData.content = processedContent
                await putPost(postId, postData)
            } else {
                const processedQuillEditors = await Promise.all(
                    quillEditors.map(async editor => {
                        const processedContent = await processContentImages(editor.content!)
                        return {
                            ...editor,
                            content: processedContent,
                            address: selectedAddress || editor.address,
                        }
                    }),
                )
                postData.memos = processedQuillEditors
                await putPost(postId, postData)
            }
            resetAll()
            window.location.href = `/post/${postId}`
        } catch (error) {
            console.error(error)
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
                            isFreeForm={isFreeForm}
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
