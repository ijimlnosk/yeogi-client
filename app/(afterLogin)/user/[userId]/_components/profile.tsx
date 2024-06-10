import { FC } from "react"
import { ProfileProps } from "../type"

const Profile: FC<ProfileProps> = ({ name, bio, profileImage, backgroundImage, onEdit }) => {
    return (
        <div className="relative font-pretendard">
            <div className="relative">
                <img
                    src={typeof backgroundImage === "string" ? backgroundImage : backgroundImage.src}
                    alt="Background"
                    className="w-full h-[440px] object-cover"
                />
                <button
                    className="absolute top-[60px] right-[120px] bg-SYSTEM-black text-SYSTEM-white py-2 px-4 rounded-xl text-md font-medium"
                    onClick={onEdit}
                >
                    프로필 수정
                </button>
            </div>
            <div className="absolute left-[120px] top-[360px] flex items-center">
                <img
                    src={typeof profileImage === "string" ? profileImage : profileImage.src}
                    alt="Profile"
                    className="w-60 h-60 rounded-full border-[5px] border-white shadow-profile"
                />
                <div className="ml-12 mt-32">
                    <h1 className="text-4xl font-semibold mb-4">{name}</h1>
                    <p className="text-lg">{bio}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile
