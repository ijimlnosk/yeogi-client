import { LeftGroup, RightGroup } from "./_components/mainImages"

const Home = () => {
    return (
        <main className="relative w-full h-[980px] flex flex-row overflow-x-hidden">
            <LeftGroup />
            <div className="absolute flex flex-col justify-center items-center w-full h-full z-10 top-[-14%] font-myeongjo">
                <p className="text-xl text-GREY-80 opacity-50">Record Your Trip</p>
                <p className="text-title">여기,</p>
            </div>
            <RightGroup />
        </main>
    )
}
export default Home
