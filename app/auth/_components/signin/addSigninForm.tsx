const AddSigninForm = () => {
    return (
        <div className="w-[450px] h-[570px] top-[205px] left-[735px] rounded-3xl border-[1px] border-BRAND-70 bg-SYSTEM-white">
            <div className="">
                <div className=" h-[64px] text-xs text-BRAND-70 font-myeongjo items-center top-[68px]">
                    회원 정보를 입력해 주세요.
                </div>
                <div className="flex justify-center h-[39px] pt-1 text-BRAND-70 font-myeongjo text-[28px]">
                    * 이메일
                </div>
            </div>
            <div className="flex flex-col items-center gap-3 pt-[89px]"></div>
        </div>
    )
}
export default AddSigninForm
