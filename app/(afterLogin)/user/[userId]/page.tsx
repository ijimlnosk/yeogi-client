import UserClient from "./_components/userClient"
import * as userApi from "@/apis/userApi"

const UserPage = async () => {
    const myInfo = await userApi.getUserInfo()

    return <UserClient initialUser={myInfo} />
}
export default UserPage
