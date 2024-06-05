import { Polaroids } from "./mainImages"

const MainDesc = () => {
    return (
        <div className="relative w-full h-max">
            <div className="absolute flex flex-col justify-center items-center w-full h-full z-10 top-[-14%] font-myeongjo">
                <p className="text-xl text-GREY-80 opacity-50 pb-[20px]">How to use YEOGI</p>
                <p className="text-subTitle">
                    <span className="text-BRAND-50">여기</span>에 어떻게 기록하나요?
                </p>
                <p className="font-pretendard text-bg text-center py-[30px]">
                    여기에서는 기존에 흩어져 있던 세계여행 후기들을 한 곳에 모아 <br /> 사용자가 사이트 이동 없이
                    기록들을 공유하고 공감할 수 있습니다.
                </p>
            </div>
            <Polaroids />
        </div>
    )
}
export default MainDesc
