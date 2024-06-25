import { useFormDataStore } from "@/libs/store"
import { processContentImages } from "@/utils/commonFormUtils"
import { Post } from "@/utils/type"
import { UseMutationResult } from "@tanstack/react-query"
import { useState, useEffect } from "react"

/**
 * @function useInitializeFormData quill editor에 postDetail 내용을 세팅하는 함수
 * @param {Post | null} postDetail  사용자가 수정하고자 하는 PostId에 해당하는 게시글의 정보를 저장하는 전역 상태
 * @returns {{ quillEditors: Array<{ content: string }>, setQuillEditors: (editors: Array<{ content: string }>) => void }}
 */
export const useInitializeFormData = (postDetail: Post | null) => {
    const { setFormData, resetFormData } = useFormDataStore()
    const [quillEditors, setQuillEditors] = useState<Array<{ content: string }>>([])

    useEffect(() => {
        resetFormData()
        if (postDetail) {
            const initialQuillEditors =
                postDetail.shortPosts?.map(post => ({
                    content: post,
                })) || []
            setFormData(postDetail)
            setQuillEditors(initialQuillEditors)
        }
    }, [postDetail, resetFormData, setFormData])

    return { quillEditors, setQuillEditors }
}

/**
 * @function handleInputChange form fields에 해당하는 변화를 감지해 input의 value로 저장하는 함수
 * @template K
 * @param {K} field 변경되는 필드
 * @param {Post[K]} value 필드의 새로운 값
 * @param {Post} formData 사용자가 작성 중인 게시글의 내용을 담을 전역 상태 (current formData)
 * @param {(formData: Post) => void} setFormData 사용자가 작성 중인 게시글의 내용을 저장하는 전역 상태 (formData update)
 */
export const handleInputChange = <K extends keyof Post>(
    field: K,
    value: Post[K],
    formData: Post,
    setFormData: (formData: Post) => void,
) => {
    setFormData({ ...formData, [field]: value })
}

/**
 * @function handleEditorInputChange memo-form에서 사용하는 에디터의 변경된 내용을 적용하는 함수
 * @param {number} index 변경된 에디터의 index
 * @param {string} value 변경된 내용
 * @param {Array<{ content: string }>} quillEditors 현재 에디터의 배열
 * @param {(editors: Array<{ content: string }>) => void} setQuillEditors 변경된 내용을 에디터에 적용
 */
export const handleEditorInputChange = (
    index: number,
    value: string,
    quillEditors: Array<{ content: string }>,
    setQuillEditors: (editors: Array<{ content: string }>) => void,
) => {
    const updatedEditors = quillEditors.map((editor, i) => (i === index ? { ...editor, content: value } : editor))
    setQuillEditors(updatedEditors)
}

/**
 * @function handleAddMemoClick memo-form에서 버튼 클릭 시 에디터가 추가되는 함수
 * @param {Array<{ content: string }>} quillEditors 현재 에디터의 배열
 * @param {(editors: Array<{ content: string }>) => void} setQuillEditors 에디터가 추가됨에 따라 에디터의 배열을 업데이트
 */
export const handleAddMemoClick = (
    quillEditors: Array<{ content: string }>,
    setQuillEditors: (editors: Array<{ content: string }>) => void,
) => {
    setQuillEditors([...quillEditors, { content: "" }])
}

/**
 * @function handleDeleteQuillEditor memo-form에서 추가된 quill editor를 삭제하는 함수
 * @param {number} index 삭제될 에디터의 index
 * @param {Array<{ content: string }>} quillEditors 현재 존재하는 에디터의 배열
 * @param {(editors: Array<{ content: string }>) => void} setQuillEditors 삭제된 에디터를 제외한 에디터의 배열을 반환
 */
export const handleDeleteQuillEditor = (
    index: number,
    quillEditors: Array<{ content: string }>,
    setQuillEditors: (editors: Array<{ content: string }>) => void,
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
export const handleUpdatePost = async (
    postId: string,
    formData: Post,
    quillEditors: Array<{ content: string }>,
    setIsSubmitted: (isSubmitted: boolean) => void,
    updatePostMutation: UseMutationResult<Post, Error, { postId: number; editedFields: Partial<Post> }>,
    selectedContinent: string | null,
    selectedCountry: string | null,
    startDate: Date | null,
    endDate: Date | null,
) => {
    if (!postId) return

    let editedPost: Partial<Post> = {
        title: formData.title,
        content: "",
        continent: selectedContinent || "아시아",
        region: formData.region || selectedCountry!,
        tripStartDate: startDate ? startDate.toISOString() : "",
        tripEndDate: endDate ? endDate.toISOString() : "",
        shortPosts: [],
    }

    if (formData.content) {
        const processedContent = await processContentImages(formData.content)
        editedPost = { ...editedPost, content: processedContent }
    } else if (formData.shortPosts) {
        const processedShortPosts = await Promise.all(
            quillEditors.map(async editor => {
                const content = await processContentImages(editor.content)
                return content
            }),
        )
        editedPost = { ...editedPost, shortPosts: processedShortPosts }
    }

    try {
        await updatePostMutation.mutateAsync({
            postId: parseInt(postId),
            editedFields: editedPost,
        })
        setIsSubmitted(true)
        window.location.href = `/detailPost/${postId}`
    } catch {
        /* 성공실패 오버레이 적용 예정 */
    }
}
