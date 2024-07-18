import Image from "next/image"
import { ProfileProps } from "./type"
import DefaultProfile from "@/public/images/user/sampleProfile.svg"
import DefaultBanner from "@/public/images/user/defaultBanner.svg"

const Profile = ({ userInfo, onEdit }: ProfileProps) => {
    return (
        <div className="relative">
            <div className="relative">
                {/* <div className="absolute inset-0 bg-black opacity-20" /> */}
                <div className="w-full h-[440px] flex justify-center items-center overflow-hidden">
                    <Image
                        width={1920}
                        height={440}
                        src={userInfo.banner ? userInfo.banner : DefaultBanner}
                        alt="banner image"
                        className="w-full min-h-[440px] bg-cover"
                    />
                </div>
                <button
                    className="absolute top-[60px] right-[120px] bg-SYSTEM-black text-SYSTEM-white py-2 px-4 rounded-xl text-md font-medium"
                    onClick={onEdit}
                >
                    프로필 수정
                </button>
            </div>
            <div className="absolute left-[120px] top-[360px] flex items-center">
                <Image
                    width={240}
                    height={240}
                    src={userInfo.profile || DefaultProfile}
                    alt="profile image"
                    className="rounded-full border-[5px] border-white shadow-profile"
                />
                <div className="ml-12 mt-36">
                    <h1 className="text-4xl font-semibold mb-4">{userInfo.nickname}</h1>
                    <p className="text-lg">{userInfo.motto}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile
