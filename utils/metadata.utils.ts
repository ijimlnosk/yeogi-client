import { Metadata } from "next"
import { searchParamsProps } from "@/constants/type"
import { Post } from "@/types/post"
import { COLORS } from "@/styles/color"
import { CREW_MEMBERS, DEPLOY_URL, DESC, KEYWORDS, NAME, TITLE } from "@/constants/metaData"

// layout page meta-data
export const DEFAULT_METADATA: Metadata = {
    title: TITLE,
    description: DESC,
    applicationName: NAME,
    viewport: "width=device-width, initial-scale=1",
    keywords: KEYWORDS,
    icons: {
        icon: "/icons/logo_img.svg",
    },
    themeColor: COLORS.BRAND[50],
    authors: CREW_MEMBERS,
    openGraph: {
        title: TITLE,
        description: DESC,
        siteName: NAME,
        locale: "ko_KR",
        type: "website",
        url: DEPLOY_URL,
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
