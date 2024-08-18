import type { Metadata } from "next"
import "./globals.css"
import Layout from "@/components/layouts/layout"
import { ReactQueryProvider } from "@/components/queryProvider"
import ClientLayout from "./clientLayout"
import { NextAuthSession } from "./nextAuthSession"
import { myeongjo, pretendard } from "./fonts"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Record Your Trip",
        description: "여기에 여행을 기록하세요",
        icons: {
            icon: "/icons/logo_img.svg",
        },
        other: {
            'link rel="preload" as="image" href="/images/main-02.webp"': "",
            'link rel="preload" as="image" href="/images/main-03.webp"': "",
        },
    }
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
