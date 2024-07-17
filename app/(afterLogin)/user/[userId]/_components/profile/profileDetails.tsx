import { ProfileDetailsProps } from "./type"

const ProfileDetails = ({ ageRange, gender, pinCount }: ProfileDetailsProps) => {
    const displayGender = (gender: string | undefined) => {
        if (gender === "M") return "남성"
        if (gender === "F") return "여성"
        return ""
    }

    return (
        <div className="flex justify-end mr-[120px] mt-10 mb-[120px]">
            <div className="flex text-bg">
                <span className="bg-SYSTEM-white p-5 mr-6 rounded-2xl w-24 h-[120px] text-center">
                    {ageRange && <span>{ageRange}&nbsp;대</span>}
                    {gender && <span>{displayGender(gender)}</span>}
                </span>

                <span className="bg-SYSTEM-white p-5 rounded-2xl w-[156px] h-[120px] text-center">
                    나의 기록 핀 <br />
                    <span className="text-BRAND-50 font-semibold">{pinCount}개</span>
                </span>
            </div>
        </div>
    )
}

export default ProfileDetails
