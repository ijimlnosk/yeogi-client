import React from "react"
import Header from "./header"
import Footer from "./footer"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 mt-[90px]">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
