import Header from "./header"
import Footer from "./footer"
import { ReactQueryProvider } from "../queryProvider"
import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <ReactQueryProvider>
                <main className="flex-1 mt-[90px]">{children}</main>
            </ReactQueryProvider>
            <Footer />
        </div>
    )
}

export default Layout
