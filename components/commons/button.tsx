import { cn } from "@/utils/tailwind.utils"
import { ButtonProps } from "./type"
import { buttonStyle } from "@/styles/common-button"

/**
 * 공용 버튼 컴포넌트
 * author: Gang
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 *
 * @example
 * // 기본 사용법
 * <Button>기본 버튼</Button>
 *
 * @example
 * // 라운드 크기, 배경색, 텍스트 색상을 지정하여 사용
 * <Button rounded="lg" background="brand50" textColor="white">커스텀 버튼</Button>
 *
 */
const Button = ({
    type = "button",
    className,
    rounded,
    background,
    textColor,
    onClick,
    children,
    isActive = false,
    ...props
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={cn(
                buttonStyle({
                    rounded,
                    background: isActive ? background : background,
                    textColor: isActive ? textColor : textColor,
                }),
                className,
            )}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
