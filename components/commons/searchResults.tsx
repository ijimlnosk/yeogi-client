import PostCard from "@/components/commons/postCard"
import TempImage from "@/public/images/sampleThumbnail.svg"

const SearchResults = () => {
    return (
        <div className="py-20">
            <PostCard
                post_id={0}
                user_profile="https://s3-alpha-sig.figma.com/img/02af/5ca9/17efd34b030c6ea9acf84d5e19fa991b?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N9TtaFLsrrJlBkT-y1tTuiv7xHqxofyKaieuLQHUZ1jujxj0uhv9OQtrS-EOFTWUz7lccHTWHDVm3TvOTWUu6JYXaJD9uXCBXKooZd62M4YZUSE8jG3noz0uGpTw1Ol1M1TfBsM5cujNHSH3Sjq3ihDOE4e3og0DSVHF80t8IlnM3iyL7usWNOznk3-6Q8Q8HNR4caEYZEodXJfpjKMYYBQwZijLyeuPc4Ws6mgC8BVscsV~8zmZRjsqOy~gclDB1fqA1GquLN3fQ27fFeepeQ19oxfRxdwQPtzcQRrXTs6v7Z12Zu5l3whMfBjS7ptWG8flnZSWV-0m9Q-Z5ZuBwg__"
                thumbnail={TempImage}
                title="웽디의 미국여행기"
                continent="북아메리카"
                user_nickname="wendy"
                created_At={new Date("2023-06-05T14:48:00.000Z")}
                commentCount={10000}
                likeCount={10000}
            />
        </div>
    )
}
export default SearchResults
