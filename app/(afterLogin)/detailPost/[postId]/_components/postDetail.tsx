"use client"

import "@/styles/editor-content.css"
import { useEffect, useRef, useState } from "react"
import { PostDetailProps } from "./type"
import { formatISODateString } from "@/utils/formatDate"
import { ShortPosts } from "@/utils/type"

const PostDetail = ({ post }: PostDetailProps) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const shortContentRef = useRef<HTMLDivElement>(null)
    const [modifiedContent, setModifiedContent] = useState<string>("")
    const [modifiedShortPost, setModifiedShortPost] = useState<string[]>([])

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
                <div>
                    <p>
                        <span className="text-BRAND-50 font-bold mx-4">{post.author}</span>
                        <span className="text-GREY-70 mx-4">{formatISODateString(post.createdAt)}</span>
                    </p>
                </div>
                <div className="flex flex-row">
                    <p className="mx-2">
                        <span className="text-GREY-70 mx-4">여행지</span>
                        <span className="text-BRAND-50 font-bold">{post.continent},</span>
                        <span className="text-BRAND-50 font-bold">{post.region}</span>
                        <span className="text-BRAND-50 font-bold">{post.address}</span>
                    </p>
                    <p className="mx-4">
                        <span className="text-GREY-70 mx-4">여행일자</span>
                        <span className="text-BRAND-50 font-bold">{`${formatISODateString(post.tripStartDate)} ~ ${formatISODateString(post.tripEndDate)}`}</span>
                    </p>
                </div>
            </div>
            <div className="p-5">
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
            <div className="   h-[59px] border-t-[1px] pl-[750px] border-GREY-30  flex items-center ">
                <p className="text-SYSTEM-black text-sm">기록한 여행의 컨셉 :</p>
                <span className="text-BRAND-50 text-sm font-bold ml-[30px]"> # {post.themeList}</span>
            </div>
        </div>
    )
}

export default PostDetail
