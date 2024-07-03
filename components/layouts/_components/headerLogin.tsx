import Link from "next/link"
import { UserInfoProps } from "../type"
import Image from "next/image"
import ProtectedLink from "@/components/protectedLink"

export type HeaderLoginProps = {
    isLoggedIn: boolean
    userInfo: UserInfoProps | undefined
}

const HeaderLogin = ({ isLoggedIn, userInfo }: HeaderLoginProps) => {
    return (
        <>
            {isLoggedIn ? (
                <Link href={`/user/${userInfo?.id}`}>
                    {userInfo?.profile ? (
                        <Image src={userInfo.profile} alt="profile" width={48} height={48} className="rounded-full" />
                    ) : (
                        <div>
                            <Image
                                src={"/images/sampleProfile.svg"}
                                alt="Profile"
                                width={48}
                                height={48}
                                className="rounded-full"
                            />
                        </div>
                    )}
                </Link>
            ) : (
                <div className="min-w-[48px] min-h-[27px]">
                    <ProtectedLink href="/auth">로그인</ProtectedLink>
                </div>
            )}
        </>
    )
}
export default HeaderLogin
