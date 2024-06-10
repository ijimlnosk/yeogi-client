"use client"

import { useState } from "react"
import Profile from "./_components/profile"
import EditProfile from "./_components/editProfile"
import defaultProfileBg from "@/public/images/p_bg.webp"
import defaultProfile from "@/public/images/profile.jpg"
import { Profile as ProfileType } from "./type"

const UserPage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState<ProfileType>({
        name: "메롱메롱",
        bio: "오늘의 여행을 내일로 미루지 말자",
        profileImage: defaultProfile,
        backgroundImage: defaultProfileBg,
    })

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = (updatedProfile: ProfileType) => {
        setProfile(updatedProfile)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    return (
        <div>
            {isEditing ? (
                <EditProfile
                    name={profile.name}
                    bio={profile.bio}
                    profileImage={profile.profileImage}
                    backgroundImage={profile.backgroundImage}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <Profile
                    name={profile.name}
                    bio={profile.bio}
                    profileImage={profile.profileImage}
                    backgroundImage={profile.backgroundImage}
                    onEdit={handleEdit}
                />
            )}
        </div>
    )
}

export default UserPage
