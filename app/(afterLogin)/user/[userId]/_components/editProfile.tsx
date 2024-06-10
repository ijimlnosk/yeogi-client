import { FC, useState } from "react"
import { EditProfileProps, Profile } from "../type"
import { StaticImageData } from "next/image"

const EditProfile: FC<EditProfileProps> = ({
    name: initialName,
    bio: initialBio,
    profileImage: initialProfileImage,
    backgroundImage: initialBackgroundImage,
    onSave,
    onCancel,
}) => {
    const [name, setName] = useState(initialName)
    const [bio, setBio] = useState(initialBio)
    const [profileImage, setProfileImage] = useState<string | StaticImageData>(initialProfileImage)
    const [backgroundImage, setBackgroundImage] = useState<string | StaticImageData>(initialBackgroundImage)

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target && event.target.result) {
                    setProfileImage(event.target.result.toString())
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target && event.target.result) {
                    setBackgroundImage(event.target.result.toString())
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSaveClick = () => {
        const updatedProfile: Profile = { name, bio, profileImage, backgroundImage }
        onSave(updatedProfile)
    }

    return (
        <div className="relative">
            <div className="relative">
                <img
                    src={typeof backgroundImage === "string" ? backgroundImage : backgroundImage.src}
                    alt="Background"
                    className="w-full h-64 object-cover opacity-50"
                />
                <input
                    type="file"
                    className="absolute top-1/2 left-1/2 opacity-0 w-full h-full cursor-pointer"
                    onChange={handleBackgroundImageChange}
                />
            </div>
            <div className="flex items-center p-4">
                <div className="relative">
                    <img
                        src={typeof profileImage === "string" ? profileImage : profileImage.src}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mr-4 opacity-50"
                    />
                    <input
                        type="file"
                        className="absolute top-1/2 left-1/2 opacity-0 w-full h-full cursor-pointer"
                        onChange={handleProfileImageChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="text-2xl font-bold border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                    <textarea
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                </div>
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
                <button className="bg-black text-white p-2" onClick={handleSaveClick}>
                    프로필 저장
                </button>
                <button className="bg-gray-500 text-white p-2" onClick={onCancel}>
                    취소
                </button>
            </div>
        </div>
    )
}

export default EditProfile
