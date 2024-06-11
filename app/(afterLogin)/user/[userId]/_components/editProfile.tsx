import { useState, FC, useRef } from "react"
import ProfileImage from "./editProfile/profileImage"
import EditField from "./editProfile/editField"
import { StaticImageData } from "next/image"
import { EditProfileProps } from "../type"
import photoIcon from "@/public/icons/photoIcon.svg"

const EditProfile: FC<EditProfileProps> = ({
    name: initialName,
    bio: initialBio,
    profileImage: initialProfileImage,
    bgImage: initialBgImage,
    onSave,
    onCancel,
}) => {
    const [name, setName] = useState(initialName)
    const [bio, setBio] = useState(initialBio)
    const [profileImage, setProfileImage] = useState<string | StaticImageData>(initialProfileImage)
    const [bgImage, setBgImage] = useState<string | StaticImageData>(initialBgImage)

    const bgImageInputRef = useRef<HTMLInputElement>(null)

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

    const handleBgImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target && event.target.result) {
                    setBgImage(event.target.result.toString())
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSaveClick = () => {
        const updatedProfile = { name, bio, profileImage, bgImage }
        onSave(updatedProfile)
    }

    return (
        <div className="relative font-pretendard">
            <div className="relative group">
                <img
                    src={typeof bgImage === "string" ? bgImage : bgImage.src}
                    alt="Background"
                    className="w-full h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                    onClick={() => bgImageInputRef.current?.click()}
                >
                    <img src={photoIcon.src} alt="Change Background" className="w-10 h-10" />
                </div>
                <input type="file" ref={bgImageInputRef} className="hidden" onChange={handleBgImageChange} />
            </div>
            <div className="absolute left-[120px] top-[320px] flex items-center group">
                <ProfileImage image={profileImage} onImageChange={handleProfileImageChange} />
                <div className="ml-12 mt-[184px]">
                    <EditField
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="input"
                        maxLength={10}
                        className="mb-4 text-4xl font-semibold w-fit"
                    />
                    <EditField
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        type="textarea"
                        maxLength={40}
                        className="text-lg w-fit resize-none"
                    />
                </div>
            </div>
            <div className="absolute top-[60px] right-[120px] flex space-x-2 z-20">
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
