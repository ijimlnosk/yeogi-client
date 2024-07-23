"use client"

import Image from "next/image"
import SuccessToFailModal from "@/components/commons/successToFailModal"
import { useCommonPost } from "../../_components/common/useCommonPost"
import { CommonPostProps } from "./type"
import UploadOverlay from "../../_components/overlay/uploadOverlay"
import UpperSelection from "../../_components/form/upperSelection"
import AddressSelection from "../../_components/form/addressSelection"
import { QuillEditor } from "../../_components/editor/editorQuill"
import ThemeSelection from "../../_components/form/themeSelection"
import FormBtn from "../../_components/form/formBtn"
import RouterOverlay from "../../_components/overlay/routerOverlay"

const CommonPost = ({
    isFreeForm,
    memos,
    handleDeleteQuillEditor,
    handleEditorInputChange,
    handleAddMemoClick,
    handleAddressInputChange,
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
    } = useCommonPost(isFreeForm)

    return (
        <>
            <div className="w-[900px] min-h-[1500px] mx-auto bg-SYSTEM-beige flex flex-col">
                <UploadOverlay
                    isOverlayOpen={isOverlayOpen}
                    setIsOverlayOpen={setIsOverlayOpen}
                    handleOverlaySubmit={handleOverlaySubmit}
                    memos={memos}
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
                        memos.map((_, index) => (
                            <div key={index}>
                                <AddressSelection
                                    index={index}
                                    memos={memos}
                                    handleInputChange={handleAddressInputChange}
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
                        ))
                    )}
                    <ThemeSelection postDetail={formData} />
                    {!isFreeForm && (
                        <div
                            onClick={handleAddMemoClick}
                            className="w-[900px] h-12 my-[30px] flex flex-row justify-center items-center rounded-[61px] bg-SYSTEM-beige border-[1px] border-BRAND-50 cursor-pointer"
                        >
                            <div className=" relative w-6 h-6">
                                <Image
                                    fill
                                    src={"/icons/plus-circle.svg"}
                                    alt="add memo icon"
                                    className="w-auto h-auto object-contain"
                                />
                            </div>
                            <p className="text-sm text-BRAND-50 mx-2">메모 추가하기</p>
                        </div>
                    )}
                    <FormBtn setIsOverlayOpen={setIsOverlayOpen} />
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
