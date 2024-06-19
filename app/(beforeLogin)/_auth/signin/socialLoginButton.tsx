import Button from "@/components/commons/button"
import Image from "next/image"
import { SocialSigninButtonProps } from "./type"

const SocialLoginButton = ({ icon, text, bgColor, border, onClick }: SocialSigninButtonProps) => {
    return (
        <Button
            className={`w-[340px] h-[44px] rounded-[90px] px-3 py-6 flex items-center justify-center space-x-2 text-[18px] ${bgColor} ${border || ""}`}
            onClick={onClick}
        >
            <Image src={icon} alt="icon" width={24} height={24} />
            <span>{text}</span>
        </Button>
    )
}
export default SocialLoginButton
