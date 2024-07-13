"use client"

import Image from "next/image"
import UpperSelection from "./form/upperSelection"
import ThemeSelection from "./form/themeSelection"
import AddressSelection from "./form/addressSelection"
import { QuillEditor } from "./editor/editorQuill"
import FormBtn from "./form/formBtn"
import UploadOverlay from "./overlay/uploadOverlay"
import RouterOverlay from "./overlay/routerOverlay"
import SuccessToFailModal from "@/components/commons/successToFailModal"
import { useCommonPost } from "@/hook/useCommonPost"
import { CommonPostProps } from "./type"

const CommonPost = ({
    isFreeForm,
    memos,
    handleDeleteQuillEditor,
    handleEditorInputChange,
    handleAddMemoClick,
    mode,
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
                        <>
                            {memos.map((memo, index) => (
                                <div key={index}>
                                    <AddressSelection
                                        index={index}
                                        address={memo.address ?? ""}
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
                    {!isFreeForm && (
                        <div
                            onClick={handleAddMemoClick}
                            className="w-[900px] h-12 my-[30px] flex flex-row justify-center items-center rounded-[61px] bg-SYSTEM-beige border-[1px] border-BRAND-50 cursor-pointer"
                        >
                            <Image width={24} height={24} src={"/icons/plus-circle.svg"} alt="add memo icon" />
                            <p className="text-sm text-BRAND-50 mx-2">메모 추가하기</p>
                        </div>
                    )}
                    <FormBtn mode={mode} setIsOverlayOpen={setIsOverlayOpen} />
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
