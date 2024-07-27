import clsx from "clsx"
import LogoImage from "@/public/icons/logo_img.svg"
import LogoText from "@/public/icons/logo_text.svg"
import Image from "next/image"
import { Link } from "@nextui-org/react"
import { footerProps } from "./_components/type"

const Footer = ({ userId }: footerProps) => {
    return (
        <footer className={clsx("w-full bg-SYSTEM-else flex flex-col  px-[120px] xl:py-20")}>
            <div className={clsx("w-full grid xl:grid-cols-3 grid-cols-1 ")}>
                <div className="flex flex-col text-GREY-80 pt-[100px] xl:pt-[212px]">
                    <h2 className="text-bg font-semibold mb-2 flex justify-center items-center xl:justify-start xl:items-start">
                        About Us
                    </h2>
                    <p className="text-xs flex justify-center items-center xl:justify-start xl:items-start xl:text-sm ">
                        ‘여기’는 비영리 단체인 모비의 지원을 받아 <br /> 개발자와 디자이너가 모여 팀을 이루었습니다.
                        <br /> <br />
                        기존의 인터넷 상에 흩어져 있던 여행 후기들을 <br /> 사용자가 별도의 웹 서칭 없이 한곳에서 확인할
                        수 있는 <br /> 커뮤니티를 제공하고자 서비스를 설계했습니다.
                    </p>
                </div>
                <div className="flex flex-col items-center mx-auto font-myeongjo pt-10">
                    <Image src={LogoImage} width={120} height={120} className="w-auto h-auto" alt="yeogi logo" />
                    <Image src={LogoText} width={90} height={60} className="w-auto h-auto" alt="yeogi logo" />
                    <p className="text-GREY-50 mt-[16px] text-bg">Record your Trip</p>
                </div>
                <div className="font-pretendard flex flex-col text-GREY-50 text-sm items-center py-5 xl:py-0 xl:place-items-end xl:justify-between mt-auto xl:items-center">
                    <nav className="flex space-x-8 mb-4 w">
                        <Link href="/" className="text-xxs xl:text-sm">
                            홈
                        </Link>
                        <Link href="/search" className="text-xxs xl:text-sm">
                            커뮤니티
                        </Link>
                        <Link href="/survey" className="text-xxs xl:text-sm">
                            내취향찾기
                        </Link>
                        <Link href={`/user/${userId}`} className="text-xxs xl:text-sm">
                            마이페이지
                        </Link>
                    </nav>
                    <p className="text-GREY-80 font-semibold text-xxs xl:text-sm">© 2024 YEOGI All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
