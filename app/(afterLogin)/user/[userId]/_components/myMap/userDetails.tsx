const UserDetails = ({ pinCount }: { pinCount: number }) => {
    return (
        <div className="flex justify-end mr-[120px] -mt-20 mb-[120px]">
            <div className="flex text-bg">
                <span className="bg-SYSTEM-white p-5 mr-6 rounded-2xl w-24 h-[120px] text-center">
                    20&nbsp;대 <br />
                    남성
                </span>
                <span className="bg-SYSTEM-white p-5 rounded-2xl w-[156px] h-[120px] text-center">
                    나의 기록 핀 <br />
                    <span className="text-BRAND-50 font-semibold">{pinCount}개</span>
                </span>
            </div>
        </div>
    )
}

export default UserDetails
