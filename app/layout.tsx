import type { Metadata } from "next"
import "./globals.css"
import Layout from "@/components/layouts/layout"
import { ReactQueryProvider } from "@/components/queryProvider"
import ClientLayout from "./clientLayout"
import { NextAuthSession } from "./nextAuthSession"
import { myeongjo, pretendard } from "./fonts"

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    title: "Record Your Trip",
    description: "여기에 여행을 기록하세요",
    keywords: ["여기", "yeogi", "여행", "기록", "여행 기록", "trip", "vacation", "travel", "travel logs"],
    icons: {
        icon: "/icons/logo_img.svg",
    },
    other: {
        'link rel="preload" as="image" href="/images/main-02.webp"': "",
        'link rel="preload" as="image" href="/images/main-03.webp"': "",
        'meta property="og:image" content="/images/og/main.png"': "",
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <script
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initAutocomplete`}
                    async
                    defer
                />
            </head>
            <body className={`${myeongjo.variable} ${pretendard.variable}`}>
                <NextAuthSession>
                    <ReactQueryProvider>
                        <ClientLayout>
                            <Layout>{children}</Layout>
                        </ClientLayout>
                    </ReactQueryProvider>
                </NextAuthSession>
            </body>
        </html>
    )
}
