import RecommendPostCard from "./_components/recommendPostCard"

const ForTestDeleteMe = () => {
    const selectedThemes = ["COST_SAVING", "EATING", "HOT_PLACE"] // 설문조사 결과에 따라 선택될 상위 theme들

    return (
        <div>
            취향 찾으러 오셨나요?
            <RecommendPostCard themes={selectedThemes} />
        </div>
    )
}
export default ForTestDeleteMe
