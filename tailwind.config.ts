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
        },
    },
    plugins: [],
}
export default config
