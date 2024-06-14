"use client"

import { useState } from "react"
import Profile from "./_components/profile"
import EditProfile from "./_components/editProfile"
import defaultBg from "@/public/images/p_bg.png"
import defaultProfile from "@/public/images/메롱고.jpeg"
import { ProfileProps } from "./type"
import WorldMap from "./_components/worldMap"
import MyPost from "./_components/myPost"
import { samplePosts } from "@/apis/mockPosts"
import { Post } from "@/utils/type"

const UserPage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState<Omit<ProfileProps, "onEdit">>({
        name: "메롱메롱",
        bio: "오늘의 여행을 내일로 미루지 말자",
        profileImage: defaultProfile,
        bgImage: defaultBg,
    })
    const [posts] = useState<Post[]>(samplePosts)

    const user = {
        nickName: "Gang",
        posts: [
            {
                id: 1,
                title: "첫 번째 게시글 제목",
                content: "첫 번째 게시글 내용",
                thumbnail: "/images/step-01.svg",
                pin: {
                    x: 60,
                    y: 67,
                },
            },
            {
                id: 2,
                title: "두 번째 게시글 제목",
                content: "두 번째 게시글 내용",
                thumbnail: "/images/step-02.svg",
                pin: {
                    x: 78.2,
                    y: 35.5,
                },
            },
        ],
    }

    const newPost = {
        id: 3,
        title: "세 번째 게시글 제목",
        content: "세 번째 게시글 내용",
        thumbnail: "/images/step-03.svg",
        pin: {
            x: 0,
            y: 0,
        },
    }

    const handleSave = (updatedProfile: Omit<ProfileProps, "onEdit">) => {
        setProfile(updatedProfile)
        setIsEditing(false)
    }

    return (
        <>
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
            <div className="my-[120px]">
                <WorldMap user={user} editable={false} newPost={newPost} />
            </div>
            <MyPost posts={posts} />
        </>
    )
}

export default UserPage
