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
    applicationName: "Yeogi",
    viewport: "width=device-width, initial-scale=1",
    keywords: ["여기", "yeogi", "여행", "기록", "여행 기록", "trip", "vacation", "travel", "travel logs"],
    icons: {
        icon: "/icons/logo_img.svg",
    },
    themeColor: "#658F47",
    authors: [
        { name: "Amy", url: "https://github.com/55555-Jyeon" },
        { name: "DK", url: "https://github.com/ca1af" },
        { name: "Gang", url: "https://github.com/ijimlnosk" },
        { name: "Jayden", url: "https://www.behance.net/saltkik" },
        { name: "Jun", url: "https://github.com/Yejun4911" },
        { name: "Louis", url: "https://github.com/Kwonnamhyung" },
        { name: "Wendy", url: "https://github.com/hayoung78" },
    ],
    openGraph: {
        title: "Record Your Trip",
        description: "여기에 여행을 기록하세요",
        siteName: "Yeogi",
        locale: "ko_KR",
        type: "website",
        url: "https://yeogi-client.vercel.app/",
        images: {
            url: "https://yeogi-client.vercel.app/images/og/main.png",
        },
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
    },
    other: {
        'link rel="preload" as="image" href="/images/main-02.webp"': "",
        'link rel="preload" as="image" href="/images/main-03.webp"': "",
        'link rel="canonical" href="https://yeogi-client.vercel.app/"': "",
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
