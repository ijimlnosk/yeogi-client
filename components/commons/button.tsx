import { ButtonHTMLAttributes, ReactNode } from "react"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/utils/tailwindUtils"

/**
 * 버튼 스타일 정의
 * author: Gang
 * @param {object}
 * @returns {string}
 */

const buttonStyle = cva(
    "flex items-center justify-center px-1 py-2 transition-all duration-500 active:scale-95 text-xs",
    {
        variants: {
            rounded: {
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
            },
            background: {
                none: "",
                gray10: "bg-GREY-10",
                gray20: "bg-GREY-20",
                black: "bg-SYSTEM-black",
                white: "bg-SYSTEM-white",
                brand30: "bg-BRAND-30",
                brand50: "bg-BRAND-50",
            },
            textColor: {
                black: "text-SYSTEM-black",
                brand50: "text-BRAND-50",
                white: "text-SYSTEM-white",
            },
        },
        defaultVariants: {
            rounded: "md",
            background: "gray20",
            textColor: "black",
        },
    },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonStyle> & {
        children?: ReactNode
        isActive?: boolean
    }
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
