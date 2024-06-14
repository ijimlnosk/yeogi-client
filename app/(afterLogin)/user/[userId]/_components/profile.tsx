import { ProfileProps } from "../type"

const Profile = ({ name, bio, profileImage, bgImage, onEdit }: ProfileProps) => {
    return (
        <div className="relative font-pretendard">
            <div className="relative">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <img
                    src={typeof bgImage === "string" ? bgImage : bgImage.src}
                    alt="background"
                    className="w-full h-[440px] object-cover"
                />
                <button
                    className="absolute top-[60px] right-[120px] bg-SYSTEM-black text-SYSTEM-white py-2 px-4 rounded-xl text-md font-medium"
                    onClick={onEdit}
                >
                    프로필 수정
                </button>
            </div>
            <div className="absolute left-[120px] top-[360px] flex items-center">
                <img
                    src={typeof profileImage === "string" ? profileImage : profileImage.src}
                    alt="profile"
                    className="w-60 h-60 rounded-full border-[5px] border-white shadow-profile"
                />
                <div className="ml-12 mt-36">
                    <h1 className="text-4xl font-semibold mb-4">{name}</h1>
                    <p className="text-lg">{bio}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile
