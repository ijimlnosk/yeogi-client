import Button from "@/components/commons/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

const PostWriteBtn = () => {
    const router = useRouter()
    return (
        <Button
            background="black"
            textColor="white"
            onClick={() => router.push("/post/create")}
            className="md:w-[120px] md:h-[46px] w-[46px] h-[46px] rounded-full flex items-center justify-center md:px-5 md:py-[13px]"
        >
            <Image
                src={"/icons/write.svg"}
                width={24}
                height={24}
                alt="게시글 작성하기"
                className="w-6 h-6 md:mr-2 mr-0"
            />
            <span className="hidden md:inline md:whitespace-nowrap md:visible invisible">글쓰기</span>
        </Button>
    )
}
export default PostWriteBtn
