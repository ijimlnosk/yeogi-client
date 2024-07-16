import { cva } from "class-variance-authority"
/**
 * 버튼 스타일 정의
 * author: Gang
 * @param {object}
 * @returns {string}
 */
export const buttonStyle = cva(
    "flex items-center justify-center px-1 py-2 transition-all duration-500 active:scale-95 text-xs",
    {
        variants: {
            rounded: {
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                xl: "rounded-xl",
            },
            background: {
                none: "",
                gray10: "bg-GREY-10",
                gray20: "bg-GREY-20",
                gray70: "bg-GREY-70",
                black: "bg-SYSTEM-black",
                white: "bg-SYSTEM-white",
                brand30: "bg-BRAND-30",
                brand50: "bg-BRAND-50",
                brand70: "bg-BRAND-70",
            },
            textColor: {
                black: "text-SYSTEM-black",
                brand50: "text-BRAND-50",
                white: "text-SYSTEM-white",
                gray80: "text-GREY-80",
            },
        },
        defaultVariants: {
            rounded: "md",
            background: "gray20",
            textColor: "black",
        },
    },
)
