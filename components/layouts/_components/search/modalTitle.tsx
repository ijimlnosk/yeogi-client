import { modalTitleSectionProps } from "./type"

const ModalTitleSection = ({ titleContainerStyle }: modalTitleSectionProps) => {
    return (
        <div className={titleContainerStyle}>
            <p className="text-GREY-20 text-bg xl:text-md md:text-text-sm font-myeongjo">Search your trip</p>
            <h1 className="text-SYSTEM-white text-[44px] xl:text-[36px] md:text-[30px] sm:text-lg pb-[2%] font-myeongjo">
                찾고 계신 <span className="text-BRAND-10">여행 기록</span>이 있으신가요?
            </h1>
            <p className="text-SYSTEM-white text-bg xl:text-md md:text-sm sm:text-xs">
                검색을 통해 기록을 찾고 마음껏 공유하세요.
            </p>
        </div>
    )
}
export default ModalTitleSection
