"use client"

import { useState, useEffect, useCallback } from "react";
import { deletePostLike, postPostLike } from "@/apis/postApi";
import { useLoggedIn } from "@/libs/loginStore";
import { Post } from "@/types/post";

const usePostLikeHandler = (postId: number, initialLiked: boolean, post: Post) => {
    const { userInfo, isLoading } = useLoggedIn();
    const [liked, setLiked] = useState<boolean>(initialLiked);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!isLoading && userInfo && post.likedMembersInfos) {
            const isLiked = post.likedMembersInfos.some(member => member.userId === userInfo.id);
            setLiked(isLiked);
        }
    }, [post.likedMembersInfos, userInfo, isLoading]);

    const handleLikeClick = useCallback(async () => {
        if (isProcessing) return;
        setIsProcessing(true);

        try {
            if (liked) {
                await deletePostLike({ postId });
            } else {
                await postPostLike({ postId });
            }
            setLiked(prev => !prev);
        } catch (error) {
            throw new Error
        } finally {
            setIsProcessing(false);
        }
    }, [liked, postId]);

    return {
        liked,
        handleLikeClick,
        isLoading,
    };
};

export default usePostLikeHandler;
