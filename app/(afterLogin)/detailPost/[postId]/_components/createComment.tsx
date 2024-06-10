const CreateComment = () => {
    return (
        <div className="w-[1000px] rounded-[16px]  ">
            <textarea
                className="w-full h-[260px] rounded-[16px] pt-[25px] pl-[20px] bg-comment-pattern bg-SYSTEM-bone border-2 border-GREY-80 focus:outline-none "
                placeholder="댓글을 입력해주세요"
            />
        </div>
    )
}
export default CreateComment
