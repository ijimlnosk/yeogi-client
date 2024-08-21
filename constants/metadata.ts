import { Post } from "@/types/post"
import { Metadata } from "next"
import { searchParamsProps } from "./type"

// layout page meta-data
export const DEFAULT_METADATA: Metadata = {
    title: "Record Your Trip",
    description: "여기에 여행을 기록하세요",
    applicationName: "Yeogi",
    viewport: "width=device-width, initial-scale=1",
    keywords: ["여기", "yeogi", "여행", "기록", "여행 기록", "trip", "vacation", "travel", "travel logs"],
    icons: {
        icon: "/icons/logo_img.svg",
    },
    themeColor: "#658F47",
    authors: [
        { name: "Amy", url: "https://github.com/55555-Jyeon" },
        { name: "DK", url: "https://github.com/ca1af" },
        { name: "Gang", url: "https://github.com/ijimlnosk" },
        { name: "Jayden", url: "https://www.behance.net/saltkik" },
        { name: "Jun", url: "https://github.com/Yejun4911" },
        { name: "Louis", url: "https://github.com/Kwonnamhyung" },
        { name: "Wendy", url: "https://github.com/hayoung78" },
    ],
    openGraph: {
        title: "Record Your Trip",
        description: "여기에 여행을 기록하세요",
        siteName: "Yeogi",
        locale: "ko_KR",
        type: "website",
        url: "https://yeogi-client.vercel.app/",
        images: {
            url: "https://yeogi-client.vercel.app/images/og/main.png",
        },
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
    },
    other: {
        'link rel="preload" as="image" href="/images/main-02.webp"': "",
        'link rel="preload" as="image" href="/images/main-03.webp"': "",
        'link rel="canonical" href="https://yeogi-client.vercel.app/"': "",
    },
}

export const getPostDetailMetadata = (post: Post): Metadata => ({
    title: `Yeogi | ${post.author ? post.author : "member"}'s post`,
    description: post.title,
    openGraph: {
        title: post.title,
        description: post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content,
        images: "https://yeogi-client.vercel.app/images/default/thumbnail01.jpg",
    },
    robots: {
        nocache: true,
    },
})

// search page meta-data
export const getSearchMetadata = (params: searchParamsProps): Metadata => ({
    title: `Yeogi | ${params.keyword ? `${params.keyword}` : "All Posts"}`,
    description: `Find posts ${params.continent ? `in ${params.continent}` : "worldwide"}${params.theme ? ` about ${params.theme}` : ""}. Sorted by ${params.postSortCondition || "recent"}.`,
    openGraph: {
        title: `Yeogi | ${params.keyword ? `${params.keyword}` : "All Posts"}`,
        description: `Find posts ${params.continent ? `in ${params.continent}` : "worldwide"}${params.theme ? ` about ${params.theme}` : ""}. Sorted by ${params.postSortCondition || "recent"}.`,
        images: "https://yeogi-client.vercel.app/images/og/search.png",
    },
    robots: {
        nocache: true,
    },
})

// survey page meta-data
export const SURVEY_METADATA: Metadata = {
    title: "Yeogi | check trip style",
    description: "간단한 취향 검사를 통해 여행 취향을 확인해보세요!",
    openGraph: {
        title: "Yeogi | check trip style",
        description: "간단한 취향 검사를 통해 여행 취향을 확인해보세요!",
        images: "https://yeogi-client.vercel.app/images/og/survey.png",
    },
}
