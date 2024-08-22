import UserClient from "./_components/userClient"
import * as postApi from "@/apis/postApi"
import * as userApi from "@/apis/userApi"

const UserPage = async () => {
    const myPosts = await postApi.getMyPosts()
    const myInfo = await userApi.getUserInfo()

    return <UserClient initialPosts={myPosts} initialUser={myInfo} />
}
export default UserPage
