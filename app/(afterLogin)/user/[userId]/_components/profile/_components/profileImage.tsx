"use client"

import { useRef } from "react"
import { ProfileImageProps } from "./type"
import Image from "next/image"

const ProfileImage = ({ image, onImageChange, className }: ProfileImageProps) => {
    const imageInputRef = useRef<HTMLInputElement>(null)

    return (
        <div className={`relative group ${className}`}>
            <Image
                width={240}
                height={240}
                src={image ? image : ""}
                alt="profile image"
                className="rounded-full border-[5px] border-SYSTEM-white shadow-profile"
            />
            <div className="absolute inset-0 bg-black opacity-60 rounded-full flex justify-center items-center">
                <p className="text-SYSTEM-white text-center flex flex-col">
                    <span className="text-xl">⚠️</span>
                    <span className="text-bg">서비스 준비 중</span>
                </p>
            </div>
            {/*           <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                onClick={() => imageInputRef.current?.click()}
            >
                <Image width={40} height={40} src={"/icons/photoIcon.svg"} alt="Change Profile" />
            </div> */}
            <input type="file" ref={imageInputRef} className="hidden" onChange={onImageChange} />
        </div>
    )
}

export default ProfileImage
