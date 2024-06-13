/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["source.unsplash.com"],
    },
    async rewrites() {
        return [
            {
                source: "/posts/:path*",
                destination: "http://ec2-43-203-193-158.ap-northeast-2.compute.amazonaws.com:8080/:path*",
            },
        ]
    },
}

export default nextConfig
