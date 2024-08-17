/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "source.unsplash.com",
            "lh3.googleusercontent.com",
            "ssl.pstatic.net",
            "k.kakaocdn.net",
            "t1.kakaocdn.net",
            "yeogi-bucket.s3.ap-northeast-2.amazonaws.com",
        ],
    },
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    devIndicators: {
        buildActivity: false,
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
                destination: "http://ec2-43-203-193-158.ap-northeast-2.compute.amazonaws.com:8080/auth/:path*",
            },
            {
                source: "/pins/:path*",
                destination: "http://ec2-43-203-193-158.ap-northeast-2.compute.amazonaws.com:8080/pins/:path*",
            },
        ]
    },
    reactStrictMode: false,
    webpack: (config, { dev, isServer, nextRuntime }) => {
        // 프로덕션 환경 && 클라이언트 사이드에서만 React Developer Tools 제거
        if (!dev && typeof window !== "undefined" && nextRuntime === "client") {
            config.plugins = config.plugins.filter(plugin => {
                return (
                    plugin.constructor.name !== "ReactDevToolsPlugin" &&
                    plugin.constructor.name !== "ReactRefreshPlugin"
                )
            })
        }
        return config
    },
}

export default nextConfig
