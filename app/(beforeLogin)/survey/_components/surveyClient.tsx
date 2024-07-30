"use client"

import { useThemeStore } from "@/libs/zustand/theme"
import RecommendPostCard from "./recommendPostCard"

const SurveyClient = () => {
    const { showResult, topTags } = useThemeStore()

    return (
        <div id="survey-result-section" className="w-full">
            {showResult && <RecommendPostCard themes={topTags} />}
        </div>
    )
}
export default SurveyClient
