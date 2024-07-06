"use client"

import "@/styles/editor-content.css"
import { useEffect, useRef, useState } from "react"
import { PostDetailProps } from "./type"
import { formatISODateString } from "@/utils/formatDate"
import { ShortPosts } from "@/utils/type"
import { postViews } from "@/apis/postApi"
import { ThemeProps } from "@/app/_components/type"

const PostDetail = ({ post }: PostDetailProps) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const shortContentRef = useRef<HTMLDivElement>(null)
    const [modifiedContent, setModifiedContent] = useState<string>("")
    const [modifiedShortPost, setModifiedShortPost] = useState<string[]>([])

    const fetchViews = async () => {
        await postViews(post.postId)
    }

    useEffect(() => {
        fetchViews()
    }, [post.postId])

    const wrapImagesWithDiv = (html: string): string => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, "text/html")

        const temp = doc.querySelectorAll("p")
        temp.forEach(p => {
            const images = p.querySelectorAll("img")
            images.forEach(img => {
                const div = document.createElement("div")
                div.className = "image-container"
                const newImg = document.createElement("img")
                newImg.src = "/images/tape.svg"
                newImg.className = "image-tape"
                div.appendChild(newImg)
                div.appendChild(img.cloneNode(true))
                if (p.parentNode) {
                    p.parentNode.insertBefore(div, p)
                    if (p.textContent?.trim() === "") {
                        p.parentNode.removeChild(p)
                    }
                }
            })
        })

        return doc.body.innerHTML
    }

    const processShortPost = (posts: ShortPosts[]) => {
        return posts.map(post => wrapImagesWithDiv(post.content))
    }

    useEffect(() => {
        if (post.content && contentRef.current) {
            const modifiedContent = wrapImagesWithDiv(post.content)
            setModifiedContent(modifiedContent)
        } else if (post.shortPostList && shortContentRef.current) {
            const modifiedShortPost = processShortPost(post.shortPostList)
            setModifiedShortPost(modifiedShortPost)
        }
    }, [post.content, post.shortPostList])

    return (
        <div className="w-[1000px] bg-post-pattern bg-SYSTEM-beige h-auto border-y-2 border-GREY-30">
            <div className="flex items-center justify-start p-5">
                <p className="text-xxl">{post.title}</p>
            </div>
            <div className="w-full flex justify-between border-t-2 border-b-2 py-2 border-GREY-30">
                <div className="w-fit">
                    <span className="text-BRAND-50 font-bold mx-4">{post.author}</span>
                    <span className="text-GREY-70 mx-4">{formatISODateString(post.createdAt)}</span>
                </div>
                <div className="flex">
                    <span className="text-GREY-70 mx-4">여행지</span>
                    <div className="flex flex-col">
                        <p>
                            <span className="text-BRAND-50 font-bold">{post.continent},</span>
                            <span className="text-BRAND-50 font-bold p-2">{post.region}</span>
                        </p>
                        <span className="text-BRAND-50 font-bold max-w-[410px] break-keep">{post.address}</span>
                    </div>
                </div>
                <div>
                    <span className="text-GREY-70 mx-4">여행일자</span>
                    <span className="text-BRAND-50 font-bold">{`${formatISODateString(post.tripStartDate)} ~ ${formatISODateString(post.tripEndDate)}`}</span>
                </div>
            </div>
            <div className="min-h-[280px] p-5">
                {post.content && (
                    <div
                        ref={contentRef}
                        dangerouslySetInnerHTML={{ __html: modifiedContent }}
                        className="custom-content "
                    />
                )}
                {post.shortPostList?.map((post: ShortPosts, index: number) => (
                    <div className="w-full flex flex-col items-center justify-center " key={post.shortPostId}>
                        <div
                            ref={shortContentRef}
                            className="py-5 flex flex-row items-center justify-center gap-2 custom-content"
                            dangerouslySetInnerHTML={{ __html: modifiedShortPost[index] }}
                        />
                    </div>
                ))}
            </div>
            <div
                className={`w-full min-h-[59px] border-t-[1px] border-GREY-30 flex ${((post.themeList as ThemeProps[]) || []).length > 7 ? "flex-col" : "flex-row"} justify-end`}
            >
                <span
                    className={`w-fit text-SYSTEM-black text-sm ${((post.themeList as ThemeProps[]) || []).length > 7 ? "items-start pl-3" : "items-center"}`}
                >
                    기록한 여행의 컨셉 :
                </span>
                <span className="px-2">
                    {((post.themeList as ThemeProps[]) || []).map((theme, index) => (
                        <span key={index} className="text-BRAND-50 text-sm font-bold p-1">
                            {`#${theme}`}
                        </span>
                    ))}
                </span>
            </div>
        </div>
    )
}

export default PostDetail
