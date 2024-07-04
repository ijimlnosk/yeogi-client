import { getPost } from "@/apis/postApi"
import { ThemeProps } from "@/app/_components/type"
import { Post } from "@/utils/type"

export const recommendPosts = async (themes: ThemeProps[]): Promise<Post[]> => {
    const postsByTheme = await Promise.all(
        themes.map(async theme => {
            const response = await getPost({
                searchType: "CONTENT",
                searchString: "",
                sortCondition: "VIEWS",
                theme: theme,
            })
            if (response.length === 0) return null
            // 조회수를 기준으로 내림차순으로 정렬하여 가장 조회수가 높은 게시글 선택
            const topPost = response.sort((a, b) => b.viewCount - a.viewCount)[0]
            return topPost
        }),
    )
    return postsByTheme.filter(post => post !== null) as Post[]
}
