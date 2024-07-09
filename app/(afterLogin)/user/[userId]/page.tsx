"use client"

import { useEffect, useState } from "react"
import EditProfile from "./_components/profile/editProfile"
import Profile from "./_components/profile/profile"
import ProfileDetails from "./_components/profile/profileDetails"
import WorldMap from "./_components/myMap/worldMap"
import MyPost from "./_components/myPost/myPosts"
import { getUserInfo } from "@/apis/userApi"
import { getPinLocalStorage } from "@/utils/storage.utils"
import { useLoggedIn } from "@/libs/loginStore"

const UserPage = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [pinCount, setPinCount] = useState<number>(0)
    const { isLoggedIn, userInfo, setUserInfo } = useLoggedIn()

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await getUserInfo()
            setUserInfo(response)
        }
        fetchUserInfo()
    }, [setUserInfo])

    useEffect(() => {
        setPinCount(getPinLocalStorage())
    }, [])

    if (isLoggedIn && userInfo)
        return (
            <div>
                <div>
                    {isEditing ? (
                        <EditProfile userInfo={userInfo} setUserInfo={setUserInfo} setIsEditing={setIsEditing} />
                    ) : (
                        <Profile userInfo={userInfo} onEdit={() => setIsEditing(true)} />
                    )}
                    <ProfileDetails ageRange={userInfo.ageRange} gender={userInfo.gender} pinCount={pinCount} />
                </div>
                <div className="my-[120px]">
                    <WorldMap email={userInfo.email} nickname={userInfo.nickname} />
                </div>
                <MyPost userInfo={userInfo} />
            </div>
        )
}

export default UserPage
