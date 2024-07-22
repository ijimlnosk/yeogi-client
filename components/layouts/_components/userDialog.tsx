import { useRouter } from "next/navigation"
import { UserDialogProps } from "./type"
import { useLogout } from "@/libs/reactQuery/useLogout"

const UserDialog = ({ userId, setIsProfileClicked }: UserDialogProps) => {
    const router = useRouter()
    const logout = useLogout()

    const navigateMypage = () => {
        router.push(`/user/${userId}`)
        setIsProfileClicked(false)
    }

    const handleLogout = () => {
        logout.mutate()
        setIsProfileClicked(false)
    }

    return (
        <div className="absolute top-20 right-[230px] w-[150px] h-[105px] bg-SYSTEM-white rounded-3xl shadow-custom p-2 flex flex-col justify-evenly items-center text-xs">
            <div onClick={navigateMypage} className="cursor-pointer">
                <p>마이페이지</p>
            </div>
            <div className="w-[60px] h-[1px] bg-GREY-20"></div>
            <div onClick={handleLogout} className="cursor-pointer">
                <p>로그아웃</p>
            </div>
        </div>
    )
}
export default UserDialog
