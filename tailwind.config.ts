import type { Config } from "tailwindcss"
import { COLORS } from "./styles/color"
import { FONT_SIZE } from "./styles/font"
import { PluginAPI } from "tailwindcss/types/config"

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
            before: {
                circle: {
                    content: '""',
                    position: "absolute",
                    width: "5px",
                    height: "5px",
                    backgroundColor: "#0c0c0c",
                    borderRadius: "50%",
                },
            },
        },
    },
    variants: {
        before: ["responsive"],
    },
    plugins: [
        function ({ addUtilities }: PluginAPI) {
            const newUtilities = {
                ".before-circle::before": {
                    content: '""',
                    position: "absolute",
                    width: "5px",
                    height: "5px",
                    backgroundColor: "#0c0c0c",
                    borderRadius: "50%",
                    top: "-4px",
                    left: "14px",
                    transform: "translate(-50%, -50%)",
                },
            }
            addUtilities(newUtilities, { respectPrefix: false, respectImportant: false })
        },
    ],
}
export default config
