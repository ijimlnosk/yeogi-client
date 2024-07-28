import SelectTemplate from "./_components/selectTemplate"

const Page = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-[1040px] h-[704px] flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center pb-[40px]">
                    <p className="font-myeongjo text-xl">
                        여기는 기록할 수 있는 <span className="text-BRAND-50">두 가지</span> 방법을 제공합니다!
                    </p>
                    <p className="font-myeongjo text-xl">본인의 기록 스타일을 선택하세요!</p>
                </div>
                <SelectTemplate />
            </div>
        </div>
    )
}
export default Page
