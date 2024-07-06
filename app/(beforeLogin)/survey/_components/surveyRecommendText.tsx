const SurveyRecommendText = () => {
    return (
        <div className="w-full flex flex-col break-keep 4xl:justify-start justify-center items-center">
            <p className="w-full text-[28px] text-GREY-50 font-myeongjo text-center 4xl:text-start py-2.5">
                Suggested trip records
            </p>
            <p className="w-full text-[44px] font-myeongjo text-center 4xl:text-start ">
                '여기'에서는 <br /> 사용자 <span className="text-BRAND-50">여행 취향</span>에 맞는 기록을
                <br /> 검사를 통해 제공하고 있어요.
            </p>
            <p className="w-full text-bg py-6 text-center 4xl:text-start ">
                간단한 취향 검사를 통해 <br /> 여행 취향을 확인하고 추천 기록을 확인하세요!
            </p>
        </div>
    )
}
export default SurveyRecommendText
