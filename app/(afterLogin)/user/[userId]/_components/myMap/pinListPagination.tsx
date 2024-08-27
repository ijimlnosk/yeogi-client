import Image from "next/image"
import { PinListPaginationProps } from "./type"

const PinListPagination = ({ currentPage, totalPages, onPageChange }: PinListPaginationProps) => {
    const goToPrev = () => onPageChange(Math.max(currentPage - 1, 1))
    const goToNext = () => onPageChange(Math.min(currentPage + 1, totalPages))

    return (
        <div className="w-full flex justify-between items-center">
            <button
                onClick={goToPrev}
                disabled={currentPage === 1}
                className="text-sm text-GREY-80 flex flex-row justify-center items-center gap-2"
            >
                <div className=" relative w-[5px] h-2 ">
                    <Image src="/icons/prev.svg" alt="<" fill />
                </div>

                <p>이전</p>
            </button>
            <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className="text-sm text-GREY-80 flex flex-row justify-center items-center gap-2"
            >
                <p>다음</p>
                <div className="w-[5px] h-2 relative">
                    <Image src="/icons/next.svg" alt=">" fill />
                </div>
            </button>
        </div>
    )
}

export default PinListPagination
