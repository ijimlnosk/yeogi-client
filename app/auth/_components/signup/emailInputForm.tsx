const EmailInputForm = ({ email }: { email: string }) => {
    return (
        <div className="flex flex-col w-full gap-2.5 pb-6 ">
            <div className="w-[400px] h-[22px] ">
                <span className="text-SYSTEM-error mr-1">*</span>이메일
            </div>
            <input
                placeholder={email}
                className="w-[400px] h-[46px] border-[1px] rounded-s focus:outline-none bg-SYSTEM-else02 pl-2"
                name="email"
                readOnly
            />
        </div>
    )
}
export default EmailInputForm
