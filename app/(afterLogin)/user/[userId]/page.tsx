import WorldMap from "./_components/worldMap"

export default function userPage() {
    const user = {
        nickName: "Gang",
        posts: [
            {
                id: 1,
                title: "첫 번째 게시글 제목",
                content: "첫 번째 게시글 내용",
                thumbnail: "/images/step-01.svg",
                pin: {
                    x: 60,
                    y: 67,
                },
            },
            {
                id: 2,
                title: "두 번째 게시글 제목",
                content: "두 번째 게시글 내용",
                thumbnail: "/images/step-02.svg",
                pin: {
                    x: 78.2,
                    y: 35.5,
                },
            },
        ],
    }

    const newPost = {
        id: 3,
        title: "세 번째 게시글 제목",
        content: "세 번째 게시글 내용",
        thumbnail: "/images/step-03.svg",
        pin: {
            x: 0,
            y: 0,
        },
    }

    return (
        <main>
            <div>
                <WorldMap user={user} editable={false} newPost={newPost} />
            </div>
        </main>
    )
}
