import { processContentImages } from "./commonFormUtils"
import { Continent } from "@/constants/continents"
import { Post } from "./type"

type QuillEditor = { content: string }
type SetFormData = (formData: Post) => void
type SetQuillEditors = (editors: QuillEditor[]) => void
type UpdatePostMutation = {
    mutateAsync: (data: { postId: number; editedFields: Post }) => Promise<void>
}

export const handleInputChange =
    (formData: Post, setFormData: SetFormData) =>
    <K extends keyof Post>(field: K, value: Post[K]) => {
        setFormData({ ...formData, [field]: value })
    }

export const handleEditorInputChange =
    (quillEditors: QuillEditor[], setQuillEditors: SetQuillEditors) => (index: number, value: string) => {
        const updatedEditors = quillEditors.map((editor, i) => (i === index ? { ...editor, content: value } : editor))
        setQuillEditors(updatedEditors)
    }

export const handleAddMemoClick = (quillEditors: QuillEditor[], setQuillEditors: SetQuillEditors) => () => {
    setQuillEditors([...quillEditors, { content: "" }])
}

export const handleDeleteQuillEditor =
    (quillEditors: QuillEditor[], setQuillEditors: SetQuillEditors) => (index: number) => {
        const updatedEditors = quillEditors.filter((_, i) => i !== index)
        setQuillEditors(updatedEditors)
    }

export const handleUpdatePost =
    (
        formData: Post,
        selectedContinent: Continent | null,
        selectedCountry: string | null,
        startDate: Date | null,
        endDate: Date | null,
        quillEditors: QuillEditor[],
        updatePostMutation: UpdatePostMutation,
        setIsSubmitted: (isSubmitted: boolean) => void,
    ) =>
    async (postId: string) => {
        if (!postId) return

        let editedPost: Post = {
            title: formData.title,
            content: "",
            continent: selectedContinent || "아시아",
            region: formData.region || selectedCountry!,
            tripStartDate: startDate ? startDate.toISOString() : "",
            tripEndDate: endDate ? endDate.toISOString() : "",
            shortPostList: [],
        }

        if (formData.content) {
            const processedContent = await processContentImages(formData.content)
            editedPost = { ...editedPost, content: processedContent }
        } else if (formData.shortPostList) {
            const processedShortPosts = await Promise.all(
                quillEditors.map(async (editor, index) => {
                    const content = await processContentImages(editor.content)
                    return { shortPostId: index, content }
                }),
            )
            editedPost = { ...editedPost, shortPostList: processedShortPosts }
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
