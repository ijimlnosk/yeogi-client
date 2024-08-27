import Image from "next/image"
import { ProfileProps } from "./type"
import DefaultProfile from "@/public/images/user/sampleProfile.svg"
import DefaultBanner from "@/public/images/user/defaultBanner.svg"

const Profile = ({ userInfo, onEdit }: ProfileProps) => {
    return (
        <div className="relative">
            <div className="relative">
                <div className="w-full h-[440px] flex justify-center items-center overflow-hidden">
                    <Image
                        fill
                        src={userInfo.banner ? userInfo.banner : DefaultBanner}
                        alt="banner image"
                        className="object-cover"
                    />
                </div>
                <button
                    className="absolute top-[60px] right-[120px] bg-SYSTEM-black text-SYSTEM-white py-2 px-4 rounded-xl text-md font-medium"
                    onClick={onEdit}
                >
                    프로필 수정
                </button>
            </div>
            <div className="absolute top-[360px] flex flex-col items-center">
                <div className="absolute left-[120px] w-[240px] h-[240px] rounded-full border-[5px] bg-SYSTEM-white border-SYETEM-white shadow-profile overflow-hidden">
                    <Image fill src={userInfo.profile || DefaultProfile} alt="profile image" className="object-cover" />
                </div>
                <div className="ml-[400px] mt-36">
                    <h1 className="text-4xl font-semibold mb-4">{userInfo.nickname}</h1>
                    <p className="text-lg">{userInfo.motto}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile
