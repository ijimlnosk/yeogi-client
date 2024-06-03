import React from "react"
import clsx from "clsx"

const Footer: React.FC = () => {
    return (
        <footer className={clsx("w-full bg-[#EDE8E3] flex flex-col py-20 px-[120px] ")}>
            <div className={clsx("w-full flex")}>
                <div className="flex flex-col text-GREY-80 pt-[212px]">
                    <h2 className="text-lg font-bold mb-2">About Us</h2>
                    <p>
                        ‘여기’는 비영리 단체인 모비의 지원을 받아 <br /> 개발자와 디자이너가 모여 팀을 이루었습니다.
                        <br /> <br />
                        기존의 인터넷 상에 흩어져 있던 여행 후기들을 <br /> 사용자가 별도의 웹 서칭 없이 한곳에서 확인할
                        수 있는 <br /> 커뮤니티를 제공하고자 서비스를 설계했습니다.
                    </p>
                </div>
                <div className="flex flex-col items-center mx-auto font-myeongjo">
                    <button className="bg-BRAND-50 text-SYSTEM-white rounded-full w-[240px] h-[80px] text-xl font-bold">
                        YEOGI
                    </button>
                    <p className="text-GREY-50 mt-[16px]">Record your Trip</p>
                </div>
                <div className="flex flex-col items-end text-GREY-50 pt-[327px]">
                    <nav className="flex space-x-6 mb-4">
                        <a href="#">커뮤니티</a>
                        <a href="#">기록</a>
                        <a href="#">마이페이지</a>
                    </nav>
                    <p className="text-GREY-80">© 2024 YEOGI All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
