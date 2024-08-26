"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchMyPosts } from "@/libs/queryClient/postQueryClient"
import { useEffect, useState } from "react"
import { getPinLocalStorage } from "@/utils/storage.utils"
import { MyUserInfoType, UserInfoType } from "@/types/user"
import EditProfile from "./profile/editProfile"
import Profile from "./profile/profile"
import ProfileDetails from "./profile/profileDetails"
import WorldMap from "./myMap/worldMap"
import MyPost from "./myPost/myPosts"
import { UserClientProps } from "./type"
import { getUserInfo } from "@/apis/userApi"

const UserClient = ({ initialUser }: UserClientProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [pinCount, setPinCount] = useState<number>(0)
    const [userInfo, setUserInfo] = useState<UserInfoType>(initialUser)

    const { data: myPosts } = useQuery({
        queryKey: ["myPosts"],
        queryFn: fetchMyPosts,
    })

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await getUserInfo()
            setUserInfo(response)
        }
        fetchUserInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { data } = useQuery({
        queryKey: ["userInfo"],
        queryFn: getUserInfo,
        initialData: userInfo,
    })

    useEffect(() => {
        setPinCount(getPinLocalStorage())
    }, [])

    const handleSetUserInfo = (newInfo: MyUserInfoType) => {
        setUserInfo(newInfo)
    }

    if (data)
        return (
            <>
                <div>
                    {isEditing ? (
                        <EditProfile userInfo={data} setUserInfo={handleSetUserInfo} setIsEditing={setIsEditing} />
                    ) : (
                        <Profile userInfo={data} onEdit={() => setIsEditing(true)} />
                    )}
                    <ProfileDetails ageRange={data.ageRange} gender={data.gender} pinCount={pinCount} />
                </div>
                <div className="my-[120px]">
                    <WorldMap userInfo={data} />
                </div>
                <MyPost userInfo={data} myPosts={myPosts || []} />
            </>
        )
}
export default UserClient
