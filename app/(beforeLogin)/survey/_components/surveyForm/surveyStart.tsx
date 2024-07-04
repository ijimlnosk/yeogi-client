"use client"

import React, { useState } from "react"
import Button from "@/components/commons/button"
import SurveyQuestionForm from "./surveyQuestionForm"

const SurveyStart = () => {
    const [showForm, setShowForm] = useState(false)

    const handleStartClick = () => {
        setShowForm(true)
    }

    return (
        <div className="relative">
            {!showForm ? (
                <div className="flex items-center justify-center h-screen">
                    <Button
                        className="w-[110px] h-[48px] rounded-xl"
                        background={"black"}
                        textColor={"white"}
                        onClick={handleStartClick}
                    >
                        시작하기
                    </Button>
                </div>
            ) : (
                <SurveyQuestionForm />
            )}
        </div>
    )
}

export default SurveyStart
