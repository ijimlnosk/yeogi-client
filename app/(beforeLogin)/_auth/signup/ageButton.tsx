import Button from "@/components/commons/button"
import { AgeButton } from "@/constants/ageButton"
import { useState } from "react"

type SignupAgeButtonProps = {
    onAgeSelect: (value: string) => void
}

const SignupAgeButton = ({ onAgeSelect }: SignupAgeButtonProps) => {
    const [selectedAge, setSelectedAge] = useState("")

    const handleAgeClick = (value: string) => {
        setSelectedAge(value)
        onAgeSelect(value)
    }
    return (
        <div className="flex gap-[9px] ">
            {AgeButton.map((age, index) => (
                <Button
                    key={index}
                    value={age.value}
                    onClick={() => handleAgeClick(age.value)}
                    className={`w-[58px] h-[42px] ${selectedAge === age.value ? "bg-blue-500 text-white" : ""}`}
                >
                    {age.key}
                </Button>
            ))}
        </div>
    )
}

export default SignupAgeButton
