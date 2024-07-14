"use client"

import { useCreatePostStore } from "@/libs/postStore"
import { memos, UpdatePost } from "@/types/post"
import { processContentImages } from "@/utils/form.utils"
import { UseMutationResult } from "@tanstack/react-query"
import { useState, useEffect } from "react"

/**
 * @function useInitializeFormData quill editor에 postDetail 내용을 세팅하는 함수
 * @param {UpdatePost | null} postDetail  사용자가 수정하고자 하는 PostId에 해당하는 게시글의 정보를 저장하는 전역 상태
 * @returns {{ quillEditors: Array<{ content: string }>, setQuillEditors: (editors: Array<{ content: string }>) => void }}
 */
export const useInitializeFormData = (postDetail: UpdatePost | null, isUpdateActive?: boolean) => {
    const { setFormData, resetFormData } = useCreatePostStore()
    const [quillEditors, setQuillEditors] = useState<memos[]>([])

    useEffect(() => {
        resetFormData()
        if (postDetail) {
            const initialQuillEditors =
                postDetail.memos?.map(post => ({
                    shortPostId: post.shortPostId,
                    content: post.content,
                    address: post.address,
                })) || []
            setFormData(postDetail)
            setQuillEditors(initialQuillEditors)
        }
    }, [postDetail, resetFormData, setFormData, isUpdateActive])

    return { quillEditors, setQuillEditors }
}

export const useCommonUpdatePost = () => {
    /**
     * @function useInitializeFormData quill editor에 postDetail 내용을 세팅하는 함수
     * @param {UpdatePost | null} postDetail  사용자가 수정하고자 하는 PostId에 해당하는 게시글의 정보를 저장하는 전역 상태
     * @returns {{ quillEditors: Array<{ content: string }>, setQuillEditors: (editors: Array<{ content: string }>) => void }}
     */
    const useInitializeFormData = (postDetail: UpdatePost | null) => {
        const { setFormData, resetFormData } = useCreatePostStore()
        const [quillEditors, setQuillEditors] = useState<memos[]>([])

        useEffect(() => {
            resetFormData()
            if (postDetail) {
                const initialQuillEditors =
                    postDetail.memos?.map(post => ({
                        shortPostId: post.shortPostId,
                        content: post.content,
                        address: post.address,
                    })) || []
                setFormData(postDetail)
                setQuillEditors(initialQuillEditors)
            } else {
                setQuillEditors([])
            }
        }, [postDetail, resetFormData, setFormData])

        return { quillEditors, setQuillEditors }
    }

    /**
     * @function handleInputChange form fields에 해당하는 변화를 감지해 input의 value로 저장하는 함수
     * @template K
     * @param {K} field 변경되는 필드
     * @param {UpdatePost[K]} value 필드의 새로운 값
     * @param {UpdatePost} formData 사용자가 작성 중인 게시글의 내용을 담을 전역 상태 (current formData)
     * @param {(formData: UpdatePost) => void} setFormData 사용자가 작성 중인 게시글의 내용을 저장하는 전역 상태 (formData update)
     */
    const handleInputChange = <K extends keyof UpdatePost>(
        field: K,
        value: UpdatePost[K],
        formData: UpdatePost,
        setFormData: (formData: UpdatePost) => void,
    ) => {
        setFormData({ ...formData, [field]: value })
    }

    /**
     * @function handleEditorInputChange memo-form에서 사용하는 에디터의 변경된 내용을 적용하는 함수
     * @param {number} index 변경된 에디터의 index
     * @param {string} value 변경된 내용
     * @param {memos[]} quillEditors 현재 에디터의 배열
     * @param {(editors: memos[]) => void} setQuillEditors 변경된 내용을 에디터에 적용
     */
    const handleEditorInputChange = (
        index: number,
        value: string,
        quillEditors: memos[],
        setQuillEditors: (editors: memos[]) => void,
    ) => {
        const updatedEditors = quillEditors.map((editor, i) => (i === index ? { ...editor, content: value } : editor))
        setQuillEditors(updatedEditors)
    }

    /**
     * @function handleAddMemoClick memo-form에서 버튼 클릭 시 에디터가 추가되는 함수
     * @param {memos[]} quillEditors 현재 에디터의 배열
     * @param {(editors: memos[]) => void} setQuillEditors 에디터가 추가됨에 따라 에디터의 배열을 업데이트
     */
    const handleAddMemoClick = (quillEditors: memos[], setQuillEditors: (editors: memos[]) => void) => {
        setQuillEditors([...quillEditors, { shortPostId: quillEditors.length, content: "", address: "" }])
    }

    /**
     * @function handleDeleteQuillEditor memo-form에서 추가된 quill editor를 삭제하는 함수
     * @param {number} index 삭제될 에디터의 index
     * @param {memos[]} quillEditors 현재 존재하는 에디터의 배열
     * @param {(editors: memos[]) => void} setQuillEditors 삭제된 에디터를 제외한 에디터의 배열을 반환
     */
    const handleDeleteQuillEditor = (
        index: number,
        quillEditors: memos[],
        setQuillEditors: (editors: memos[]) => void,
    ) => {
        const updatedEditors = quillEditors.filter((_, i) => i !== index)
        setQuillEditors(updatedEditors)
    }

    /**
     * @function handleUpdatePost 게시글을 업데이트하는 함수
     * @param {string} postId 게시글의 ID
     * @param {Post} formData 사용자가 작성 중인 게시글의 내용을 담을 전역 상태 (current formData)
     * @param {Array<{ content: string }>} quillEditors 현재 존재하는 에디터의 배열
     * @param {(isSubmitted: boolean) => void} setIsSubmitted 게시글이 성공적으로 업데이트되었는지 여부를 설정
     * @param {UseMutationResult<Post, Error, { postId: number; editedFields: Partial<Post> }>} updatePostMutation 게시글 업데이트 mutation 함수
     * @param {string | null} selectedContinent 사용자가 선택한 대륙
     * @param {string | null} selectedCountry 사용자가 선택한 국가
     * @param {Date | null} startDate 여행 시작 날짜
     * @param {Date | null} endDate 여행 종료 날짜
     */
    const handleUpdatePost = async (
        postId: number,
        formData: UpdatePost,
        quillEditors: Array<{ content: string }>,
        setIsSubmitted: (isSubmitted: boolean) => void,
        updatePostMutation: UseMutationResult<UpdatePost, Error, { postId: number; editedFields: Partial<UpdatePost> }>,
        selectedContinent: string | null,
        selectedCountry: string | null,
        startDate: Date | null,
        endDate: Date | null,
    ) => {
        if (!postId) return

        let editedPost: Partial<UpdatePost> = {
            title: formData.title,
            content: "",
            continent: selectedContinent || "아시아",
            region: formData.region || selectedCountry!,
            tripStartDate: startDate ? startDate.toISOString() : "",
            tripEndDate: endDate ? endDate.toISOString() : "",
            memos: [],
            address: formData.address,
        }

        if (formData.content) {
            const processedContent = await processContentImages(formData.content)
            editedPost = { ...editedPost, content: processedContent }
        } else if (formData.memos) {
            const processedmemos = await Promise.all(
                quillEditors.map(async (editor, index) => {
                    const content = await processContentImages(editor.content)
                    return { shortPostId: index + 1, content, address: formData.memos![index].address }
                }),
            )
            editedPost = { ...editedPost, memos: processedmemos }
        }

        try {
            await updatePostMutation.mutateAsync({
                postId: postId,
                editedFields: editedPost,
            })
            setIsSubmitted(true)
            window.location.href = `/detailPost/${postId}`
        } catch {
            setIsSubmitted(false)
        }
    }

    return {
        useInitializeFormData,
        handleInputChange,
        handleEditorInputChange,
        handleAddMemoClick,
        handleDeleteQuillEditor,
        handleUpdatePost,
    }
}
