"use client"

import { useCommonPost } from "@/hook/useCommonPost"
import UploadOverlay from "./overlay/uploadOverlay"
import UpperSelection from "./form/upperSelection"
import ThemeSelection from "./form/themeSelection"
import { QuillEditor } from "./editor/editorQuill"
import FormBtn from "./form/formBtn"
import Image from "next/image"
import AddMemoIcon from "@/public/icons/plus-circle.svg"
import RouterOverlay from "./overlay/routerOverlay"
import SuccessToFailModal from "@/components/commons/successToFailModal"
import { CommonPostProps } from "./type"
import AddressSelection from "./editor/addressSelection"

const CommonPost = ({
    isFreeForm,
    shortPosts,
    handleDeleteQuillEditor,
    handleEditorInputChange,
    handleAddMemoClick,
}: CommonPostProps) => {
    const {
        isOverlayOpen,
        setIsOverlayOpen,
        isRouterOverlayOpen,
        isFailModalOpen,
        setIsFailModalOpen,
        handleInputChange,
        handleOverlaySubmit,
        formData,
        handleSubmitEditedPost,
    } = useCommonPost(isFreeForm)

    return (
        <>
            <div className="w-[900px] min-h-[1500px] mx-auto bg-SYSTEM-beige flex flex-col">
                <UploadOverlay
                    isOverlayOpen={isOverlayOpen}
                    setIsOverlayOpen={setIsOverlayOpen}
                    handleOverlaySubmit={handleOverlaySubmit}
                    shortPosts={shortPosts}
                />
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
                        <>
                            {shortPosts.map((post, index) => (
                                <div key={index}>
                                    <AddressSelection
                                        index={index}
                                        address={post.address ?? ""}
                                        handleInputChange={(index, value) =>
                                            handleEditorInputChange && handleEditorInputChange(index, value)
                                        }
                                    />
                                    <QuillEditor
                                        index={index}
                                        handleDeleteQuillEditor={() =>
                                            handleDeleteQuillEditor && handleDeleteQuillEditor(index)
                                        }
                                        handleEditorInputChange={
                                            handleEditorInputChange
                                                ? (index, value) => handleEditorInputChange(index, value)
                                                : undefined
                                        }
                                        postDetail={formData}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                    <ThemeSelection postDetail={formData} />
                    {shortPosts && handleAddMemoClick && (
                        <div
                            onClick={handleAddMemoClick}
                            className="w-[900px] h-12 my-[30px] flex flex-row justify-center items-center rounded-[61px] bg-SYSTEM-beige border-[1px] border-BRAND-50 cursor-pointer"
                        >
                            <Image width={24} height={24} src={AddMemoIcon} alt="add memo icon" />
                            <p className="text-sm text-BRAND-50 mx-2">메모 추가하기</p>
                        </div>
                    )}
                    <FormBtn setIsOverlayOpen={setIsOverlayOpen} handleUpdatePost={handleSubmitEditedPost} />
                </div>
            </div>
            {isRouterOverlayOpen && <RouterOverlay isRouterOverlayOpen={isRouterOverlayOpen} />}
            {isFailModalOpen && (
                <SuccessToFailModal
                    isOpen={isFailModalOpen}
                    title="게시글 등록"
                    context="기록 글이 업로드되지 않았어요."
                    onClick={() => setIsFailModalOpen(false)}
                    state={"fail"}
                />
            )}
        </>
    )
}
export default CommonPost
