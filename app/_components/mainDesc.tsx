import { Polaroids } from "./mainImages"

const MainDesc = () => {
    return (
        <div className="relative w-full h-[980px]">
            <div className="absolute w-full flex flex-col justify-center items-center font-myeongjo">
                <p className="text-xl xl:text-md sm:text-sm text-GREY-80 opacity-50 pb-5">How to use YEOGI</p>
                <p className="text-subTitle xl:text-xxl sm:text-[30px]">
                    <span className="text-BRAND-50">여기</span>에 어떻게 기록하나요?
                </p>
                <p className="font-pretendard text-bg xl:text-md sm:text-sm text-center py-[30px]">
                    여기에서는 기존에 흩어져 있던 세계여행 후기들을 한 곳에 모아 <br /> 사용자가 사이트 이동 없이
                    기록들을 공유하고 공감할 수 있습니다.
                </p>
            </div>
            <Polaroids />
        </div>
    )
}
export default MainDesc
