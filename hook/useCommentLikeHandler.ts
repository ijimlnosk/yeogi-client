import { useState, useEffect } from "react";
import { postCommentLike, deleteCommentLike } from "@/apis/commentApi";
import { useLikeStore } from "@/libs/likeStore";

const useLikeHandler = (commentId: number, initialLikes: number, initialLiked: boolean, setIsError: (error: boolean) => void) => {
    const { likes, setLikes } = useLikeStore();
    const [liked, setLiked] = useState(initialLiked);
   
    useEffect(() => {
        if(likes[commentId] === undefined){
            setLikes(commentId, initialLikes); // 초기 좋아요 수 설정
        }
        setLiked(initialLiked);
    }, [commentId, initialLikes, initialLiked, setLikes]);

    const handleLikeClick = async () => {
        try {
            if (liked) {
                await deleteCommentLike({ commentId });
                setLikes(commentId, (likes[commentId] || initialLikes) - 1); // 좋아요 수 감소
            } else {
                await postCommentLike({ commentId });
                setLikes(commentId, (likes[commentId] || initialLikes) + 1); // 좋아요 수 증가
            }
            setLiked(!liked);
        } catch (error) {
            setIsError(true);
        }
    };

    return {
        likes: likes[commentId] || initialLikes,
        liked,
        handleLikeClick,
    };
};

export default useLikeHandler;
