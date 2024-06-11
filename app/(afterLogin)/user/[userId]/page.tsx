"use client"

import { useState } from "react"
import Profile from "./_components/profile"
import EditProfile from "./_components/editProfile"
import defaultBg from "@/public/images/p_bg.png"
import defaultProfile from "@/public/images/메롱고.jpeg"
import { ProfileProps, EditProfileProps } from "./type"

const UserPage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState<Omit<ProfileProps, "onEdit">>({
        name: "메롱메롱",
        bio: "오늘의 여행을 내일로 미루지 말자",
        profileImage: defaultProfile,
        bgImage: defaultBg,
    })

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = (updatedProfile: Omit<ProfileProps, "onEdit">) => {
        setProfile(updatedProfile)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    return (
        <div className="h-screen">
            {isEditing ? (
                <EditProfile
                    name={profile.name}
                    bio={profile.bio}
                    profileImage={profile.profileImage}
                    bgImage={profile.bgImage}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <Profile
                    name={profile.name}
                    bio={profile.bio}
                    profileImage={profile.profileImage}
                    bgImage={profile.bgImage}
                    onEdit={handleEdit}
                />
            )}
        </div>
    )
}

export default UserPage
