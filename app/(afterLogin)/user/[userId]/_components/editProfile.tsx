import { useState, useRef, FC } from "react"
import { EditProfileProps, Profile } from "../type"
import { StaticImageData } from "next/image"
import photoIcon from "@/public/icons/photoIcon.svg"

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

    const profileImageInputRef = useRef<HTMLInputElement>(null)
    const backgroundImageInputRef = useRef<HTMLInputElement>(null)

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
        <div className="relative font-pretendard">
            <div className="relative">
                <img
                    src={typeof backgroundImage === "string" ? backgroundImage : backgroundImage.src}
                    alt="Background"
                    className="w-full h-[440px] object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src={photoIcon.src}
                        alt="Change Background"
                        className="w-10 h-10 cursor-pointer"
                        onClick={() => backgroundImageInputRef.current?.click()}
                    />
                </div>
                <input
                    type="file"
                    ref={backgroundImageInputRef}
                    className="hidden"
                    onChange={handleBackgroundImageChange}
                />
            </div>
            <div className="absolute left-[120px] top-[360px] flex items-center">
                <div className="relative">
                    <img
                        src={typeof profileImage === "string" ? profileImage : profileImage.src}
                        alt="Profile"
                        className="w-60 h-60 rounded-full border-[5px] border-white shadow-profile opacity-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <img
                            src={photoIcon.src}
                            alt="Change Profile"
                            className="w-10 h-10 cursor-pointer"
                            onClick={() => profileImageInputRef.current?.click()}
                        />
                    </div>
                    <input
                        type="file"
                        ref={profileImageInputRef}
                        className="hidden"
                        onChange={handleProfileImageChange}
                    />
                </div>
                <div className="ml-12 mt-32">
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="text-4xl font-semibold mb-4 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                    <textarea
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        className="text-lg border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                </div>
            </div>
            <div className="absolute top-[60px] right-[120px] flex space-x-2">
                <button
                    className="bg-SYSTEM-black text-SYSTEM-white py-2 px-4 rounded-xl text-md font-medium"
                    onClick={handleSaveClick}
                >
                    프로필 저장
                </button>
                <button className="bg-gray-500 text-white py-2 px-4 rounded-xl text-md font-medium" onClick={onCancel}>
                    취소
                </button>
            </div>
        </div>
    )
}

export default EditProfile
