import "./globals.css"
import Layout from "@/components/layouts/layout"
import { ReactQueryProvider } from "@/components/queryProvider"
import ClientLayout from "./clientLayout"
import { NextAuthSession } from "./nextAuthSession"
import { myeongjo, pretendard } from "./fonts"
import { DEFAULT_METADATA } from "@/utils/metadata.utils"

export const metadata = DEFAULT_METADATA

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
