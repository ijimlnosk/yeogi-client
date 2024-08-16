import { NextRequest, NextResponse } from "next/server"

export const middleware = (req: NextRequest) => {
    const token = req.cookies.get("accessToken")?.value
    const tokenVisit = req.cookies.get("my-first-login")?.value
    const firstVisit = tokenVisit === "true"

    const url = req.nextUrl.clone()
    const pathname = url.pathname

    if (firstVisit && !!!token && pathname !== "/auth/addInfo") {
        return NextResponse.redirect(new URL("/auth/addInfo", req.url))
    }

    if (!token) {
        const response = NextResponse.next()
        response.headers.set("x-show-login-modal", "true")
        return response
    }
    // 토큰이 있는 경우, 다음 미들웨어 또는 페이지로 계속 진행할 수 있도록 NextResponse.next()를 반환
    return NextResponse.next()
}
export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
}
