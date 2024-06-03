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
            boxShadow: {
                custom: "3px 4px 18px 0px #59595945",
            },
            extend: {},
        },
    },
    plugins: [],
}
export default config
