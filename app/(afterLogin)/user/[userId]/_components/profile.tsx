// components/profile.tsx
import React from "react"
import { ProfileProps } from "../type"

const Profile: React.FC<ProfileProps> = ({ name, bio, profileImage, backgroundImage, onEdit }) => {
    return (
        <div className="relative">
            <img
                src={typeof backgroundImage === "string" ? backgroundImage : backgroundImage.src}
                alt="Background"
                className="w-full h-64 object-cover"
            />
            <button className="absolute top-4 right-4 bg-black text-white p-2" onClick={onEdit}>
                프로필 수정
            </button>
            <div className="flex items-center p-4">
                <img
                    src={typeof profileImage === "string" ? profileImage : profileImage.src}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mr-4"
                />
                <div>
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <p>{bio}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile
