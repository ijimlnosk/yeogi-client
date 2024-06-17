"use client"

import { useRef } from "react"
import photoIcon from "@/public/icons/photoIcon.svg"
import { ProfileImageProps } from "./type"

const ProfileImage = ({ image, onImageChange, className }: ProfileImageProps) => {
    const imageInputRef = useRef<HTMLInputElement>(null)

    return (
        <div className={`relative group ${className}`}>
            <img
                src={typeof image === "string" ? image : image.src}
                alt="Profile"
                className="w-60 h-60 rounded-full border-[5px] border-white shadow-profile"
            />
            <div className="absolute inset-0 bg-black opacity-60 rounded-full"></div>
            <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                onClick={() => imageInputRef.current?.click()}
            >
                <img src={photoIcon.src} alt="Change Profile" className="w-10 h-10" />
            </div>
            <input type="file" ref={imageInputRef} className="hidden" onChange={onImageChange} />
        </div>
    )
}

export default ProfileImage
