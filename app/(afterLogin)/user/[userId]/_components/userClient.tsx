"use client"

import { useLoggedIn } from "@/libs/zustand/login"
import { getPinLocalStorage } from "@/utils/storage.utils"
import { useEffect, useState } from "react"
import { MyUserInfoType } from "@/types/user"
import EditProfile from "./profile/editProfile"
import Profile from "./profile/profile"
import ProfileDetails from "./profile/profileDetails"
import WorldMap from "./myMap/worldMap"
import MyPost from "./myPost/myPosts"
import { useQuery } from "@tanstack/react-query"
import { fetchMyPosts } from "@/libs/queryClient/postQueryClient"
import { UserClientProps } from "./type"

const UserClient = ({ initialPosts }: UserClientProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [pinCount, setPinCount] = useState<number>(0)
    const { userInfo, setUserInfo } = useLoggedIn()

    const { data: myPosts } = useQuery({
        queryKey: ["myPosts"],
        queryFn: fetchMyPosts,
        initialData: initialPosts,
    })

    useEffect(() => {
        const fetchUserInfo = async () => {
            setUserInfo(userInfo!)
        }
        fetchUserInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setPinCount(getPinLocalStorage())
    }, [])

    const handleSetUserInfo = (newInfo: MyUserInfoType) => {
        setUserInfo(newInfo)
    }

    if (userInfo)
        return (
            <>
                <div>
                    {isEditing ? (
                        <EditProfile userInfo={userInfo} setUserInfo={handleSetUserInfo} setIsEditing={setIsEditing} />
                    ) : (
                        <Profile userInfo={userInfo} onEdit={() => setIsEditing(true)} />
                    )}
                    <ProfileDetails ageRange={userInfo.ageRange} gender={userInfo.gender} pinCount={pinCount} />
                </div>
                <div className="my-[120px]">
                    <WorldMap email={userInfo.email} nickname={userInfo.nickname} />
                </div>
                <MyPost userInfo={userInfo} myPosts={myPosts} />
            </>
        )
}
export default UserClient
