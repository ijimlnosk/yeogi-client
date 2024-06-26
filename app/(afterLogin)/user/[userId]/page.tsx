"use client"

import { useEffect, useState } from "react"
import defaultBg from "@/public/images/p_bg.png"
import defaultProfile from "@/public/images/메롱고.jpeg"
import MyPost from "./_components/myPost"
import { Post } from "@/utils/type"
import { ProfileProps } from "./_components/profile/type"
import EditProfile from "./_components/profile/editProfile"
import Profile from "./_components/profile/profile"
import WorldMap from "./_components/myMap/worldMap"
import UserDetails from "./_components/userDetails"
import { getUserInfo } from "@/apis/userApi"
import { getPinLocalStorage } from "@/utils/localStorage"
import { UserInfoProps } from "./type"

const UserPage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [userInfo, setUserInfo] = useState<UserInfoProps>({ nickname: "", email: "" })
    const [pinCount, setPinCount] = useState(0)
    const [profile, setProfile] = useState<Omit<ProfileProps, "onEdit">>({
        name: "메롱메롱",
        bio: "오늘의 여행을 내일로 미루지 말자",
        profileImage: defaultProfile,
        bgImage: defaultBg,
    })

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await getUserInfo()
            setUserInfo(response)
        }
        fetchUserInfo()
    }, [])

    useEffect(() => {
        setPinCount(getPinLocalStorage())
    })

    const [posts] = useState<Post[]>()

    const handleSave = (updatedProfile: Omit<ProfileProps, "onEdit">) => {
        setProfile(updatedProfile)
        setIsEditing(false)
    }

    return (
        <div>
            <div>
                {isEditing ? (
                    <EditProfile
                        name={profile.name}
                        bio={profile.bio}
                        profileImage={profile.profileImage}
                        bgImage={profile.bgImage}
                        onSave={handleSave}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <Profile
                        name={profile.name}
                        bio={profile.bio}
                        profileImage={profile.profileImage}
                        bgImage={profile.bgImage}
                        onEdit={() => setIsEditing(true)}
                    />
                )}
                <UserDetails pinCount={pinCount} />
            </div>
            <div className="my-[120px]">
                <WorldMap userInfo={userInfo} />
            </div>
            <MyPost posts={posts} />
        </div>
    )
}

export default UserPage
