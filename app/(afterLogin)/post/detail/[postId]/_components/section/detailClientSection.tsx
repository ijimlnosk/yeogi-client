"use client"

import { useEffect, useRef, useState } from "react"
import { PostDetailSectionProps } from "./type"
import { memos } from "@/types/post"
import Image from "next/image"
import { postViews } from "@/apis/postApi"

const PostDetailContentSection = ({ post }: PostDetailSectionProps) => {
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

    const processShortPost = (posts: memos[]) => {
        return posts.map(post => wrapImagesWithDiv(post.content))
    }

    useEffect(() => {
        if (post.content && contentRef.current) {
            const modifiedContent = wrapImagesWithDiv(post.content)
            setModifiedContent(modifiedContent)
        } else if (post.memos && shortContentRef.current) {
            const modifiedShortPost = processShortPost(post.memos)
            setModifiedShortPost(modifiedShortPost)
        }
    }, [post.content, post.memos])

    return (
        <div className="min-h-[280px] p-3">
            {post.memos.length > 0 ? (
                post.memos?.map((post: memos, index: number) => (
                    <div className="w-full flex flex-col justify-center items-start" key={post.memoId}>
                        <p className="w-max px-5 py-2 my-5 text-BRAND-70 bg-BRAND-05 rounded-full border-[1px] border-BRAND-50 flex">
                            <Image
                                width={16}
                                height={16}
                                src={"/icons/darkgreen_gps.svg"}
                                alt="detail location"
                                className="mr-2"
                            />
                            {post.address}
                        </p>
                        <div
                            ref={shortContentRef}
                            className="py-5 flex flex-row gap-2 custom-content"
                            dangerouslySetInnerHTML={{ __html: modifiedShortPost[index] }}
                        />
                    </div>
                ))
            ) : (
                <>
                    <p className="w-max px-5 py-2 my-5 text-BRAND-70 bg-BRAND-05 rounded-full border-[1px] border-BRAND-50 flex">
                        <Image
                            width={16}
                            height={16}
                            src={"/icons/darkgreen_gps.svg"}
                            alt="detail location"
                            className="mr-2"
                        />
                        {post.address}
                    </p>
                    <div
                        ref={contentRef}
                        dangerouslySetInnerHTML={{ __html: modifiedContent }}
                        className="custom-content py-2"
                    />
                </>
            )}
        </div>
    )
}
export default PostDetailContentSection
