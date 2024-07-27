"use client"
import Header from "./header"
import Footer from "./footer"
import { ReactNode } from "react"
import { useLoggedIn } from "@/libs/zustand/login"

const Layout = ({ children }: { children: ReactNode }) => {
    const { userInfo } = useLoggedIn()
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 mt-[90px]">{children}</main>
            <Footer userId={userInfo?.id} />
        </div>
    )
}

export default Layout
