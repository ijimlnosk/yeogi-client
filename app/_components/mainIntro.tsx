import { LeftGroup, RightGroup } from "./mainImages"

const MainIntro = () => {
    return (
        <div className="relative w-full h-fit flex flex-row mb-[181px]">
            <LeftGroup />
            <div className="absolute flex flex-col justify-center items-center w-full h-full z-10 top-[-14%] font-myeongjo">
                <p className="text-xl text-GREY-80 opacity-50">Record Your Trip</p>
                <p className="text-title">여기,</p>
            </div>
            <RightGroup />
            <div className="absolute right-[120px] bottom-0 w-[490px]">
                <p className="font-myeongjo text-[40px] ">
                    <span className="font-semibold relative before-circle">여</span>행을{" "}
                    <span className="font-semibold relative before-circle">기</span>록하다
                </p>
                <p className="text-lg">여기는 세계 곳곳의 추억들을 한 곳에서 공유할 수 있도록 마련된 공간입니다.</p>
            </div>
        </div>
    )
}
export default MainIntro
