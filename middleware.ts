import { NextRequest, NextResponse} from "next/server"

export const middleware = (req: NextRequest) => {
    const token = req.cookies.get("accessToken")?.value

    if (!token) {
        const response = NextResponse.next();
        response.headers.set('x-show-login-modal', 'true');
        return response
    }
    // 토큰이 있는 경우, 다음 미들웨어 또는 페이지로 계속 진행할 수 있도록 NextResponse.next()를 반환합니다.
    return NextResponse.next();
};
export const config = {
    matcher: ['/createPost/:path*', '/detailPost/:path*', '/user/:path*']
}


