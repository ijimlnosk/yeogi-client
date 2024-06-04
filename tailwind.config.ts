import type { Config } from "tailwindcss"
import { COLORS } from "./styles/color"
import { FONT_SIZE } from "./styles/font"
const { nextui } = require("@nextui-org/react")

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
            darkMode: "class",
            plugins: [nextui()],
        },
    },
    plugins: [],
}
export default config
