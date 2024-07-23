import { SurveyResultProps } from "./type"

const SurveyResult = ({ topTags }: SurveyResultProps) => (
    <div className="w-[730px] h-[494px] bg-SYSTEM-white rounded-3xl p-4 flex flex-col justify-center gap-2 items-center pt-16">
        <h2 className="font-semibold text-xl pb-6">결과</h2>
        {topTags.map(tag => (
            <p key={tag} className="w-[530px] text-lg">
                {tag}
            </p>
        ))}
    </div>
)

export default SurveyResult
