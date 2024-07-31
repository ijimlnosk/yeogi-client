import UserClient from "./_components/userClient"
import * as postApi from "@/apis/postApi"

const UserPage = async () => {
    const myPosts = await postApi.getMyPosts()

    return <UserClient initialPosts={myPosts} />
}
export default UserPage
