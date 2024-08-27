"use client"

import { useRef } from "react"
import { ProfileImageProps } from "./type"
import Image from "next/image"

const ProfileImage = ({ image, onImageChange, className }: ProfileImageProps) => {
    const imageInputRef = useRef<HTMLInputElement>(null)

    return (
        <div
            className={`relative w-[240px] h-[240px] rounded-full overflow-hidden border-[5px] bg-SYSTEM-white border-SYSTEM-white shadow-profile group ${className}`}
        >
            <Image fill src={image ? image : ""} alt="profile image" className="object-cover" />
            <div className="absolute inset-0 bg-black opacity-60 rounded-full flex justify-center items-center" />
            <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                onClick={() => imageInputRef.current?.click()}
            >
                <Image width={40} height={40} src={"/icons/photoIcon.svg"} alt="Change Profile" />
            </div>
            <input type="file" ref={imageInputRef} className="hidden" onChange={onImageChange} />
        </div>
    )
}

export default ProfileImage
