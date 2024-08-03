/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "source.unsplash.com",
            "lh3.googleusercontent.com",
            "ssl.pstatic.net",
            "k.kakaocdn.net",
            "t1.kakaocdn.net",
        ],
    },
    async rewrites() {
        return [
            {
                source: "/api/posts/:path*",
                destination: "http://ec2-43-203-193-158.ap-northeast-2.compute.amazonaws.com:8080/posts/:path*",
            },
            {
                source: "/posts/:path*",
                destination: "http://ec2-43-203-193-158.ap-northeast-2.compute.amazonaws.com:8080/posts:path*",
            },
            {
                source: "/member/:path*",
                destination: "http://ec2-43-203-193-158.ap-northeast-2.compute.amazonaws.com:8080/member/:path*",
            },
            {
                source: "/comments/:path*",
                destination: "http://ec2-43-203-193-158.ap-northeast-2.compute.amazonaws.com:8080/comments/:path*",
            },
            {
                source: "/reply/:path*",
                destination: "http://ec2-43-203-193-158.ap-northeast-2.compute.amazonaws.com:8080/:path*",
            },
            {
                source: "/auth/:path*",
                destination: "http://ec2-43-203-193-158.ap-northeast-2.compute.amazonaws.com:8080/:path*",
            },
            {
                source: "/pins/:path*",
                destination: "http://ec2-43-203-193-158.ap-northeast-2.compute.amazonaws.com:8080/:path*",
            },
        ]
    },
    reactStrictMode: false,
}

export default nextConfig
