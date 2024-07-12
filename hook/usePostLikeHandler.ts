import { useState, useEffect } from "react";
import { useLikeStore } from "@/libs/likeStore";
import { deletePostLike, postPostLike } from "@/apis/postApi";

const usePostLikeHandler = (postId: number , initialLikes: number, initialLiked: boolean, setIsError: (error: boolean) => void) => {
    const { likes, setLikes } = useLikeStore();
    const [liked, setLiked] = useState(initialLiked);
   
    useEffect(() => {
        if(likes[postId] === undefined){
            setLikes(postId, initialLikes); // 초기 좋아요 수 설정
        }
        setLiked(initialLiked);
    }, [postId, initialLikes, initialLiked, setLikes]);

    const handleLikeClick = async () => {
        try {
            if (liked) {
                await deletePostLike({ postId });
                setLikes(postId, (likes[postId] || initialLikes) - 1); // 좋아요 수 감소
            } else {
                await postPostLike({ postId });
                setLikes(postId, (likes[postId] || initialLikes) + 1); // 좋아요 수 증가
            }
            setLiked(!liked);
        } catch (error) {
            setIsError(true);
        }
    };

    return {
        likes: likes[postId] || initialLikes,
        liked,
        handleLikeClick,
    };
};

export default usePostLikeHandler;
