import Link from "next/link"
import Image from "next/image"
import ProtectedLink from "@/components/protectedLink"
import { HeaderLoginProps } from "./type"

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
                <div className="min-w-12 min-h-[27px]">
                    <ProtectedLink href="/auth">로그인</ProtectedLink>
                </div>
            )}
        </>
    )
}
export default HeaderLogin
