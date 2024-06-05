import type { Config } from "tailwindcss"
import { COLORS } from "./styles/color"
import { FONT_SIZE } from "./styles/font"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                ...COLORS,
            },
            fontSize: {
                ...FONT_SIZE,
            },
            backgroundImage: {
                "comment-pattern": "url(/images/comment-bg.svg)",
                "re-comment-pattern": "url(/images/re-comment-bg.svg)",
            },
            boxShadow: {
                polaroid: "3px 4px 18px 0 rgba(107, 68, 28, .27)",
                "polaroid-hover": "3px 4px 22px 0 rgba(107, 68, 28, .1)",
            },
            scale: {
                "120": "1.2",
            },
        },
    },
    plugins: [],
}
export default config
