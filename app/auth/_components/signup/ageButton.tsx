import Button from "@/components/commons/button"
import { AgeButton } from "@/constants/ButtonText"
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
                    className={`w-[60px] h-[42px] bg-SYSTEM-white rounded-lg ${selectedAge === age.value ? "border-[1px] border-BRAND-50 text-BRAND-50" : ""}`}
                >
                    {age.key}
                </Button>
            ))}
        </div>
    )
}

export default SignupAgeButton
