"use client"

import "@/styles/editor-content.css"
import { useEffect, useRef, useState } from "react"
import { PostDetailSectionProps } from "./type"
import { postViews } from "@/apis/postApi"
import { formatISODateString } from "@/utils/date.utils"
import { memos } from "@/types/post"
import { Theme } from "@/types/theme"
import Image from "next/image"

const PostDetailSection = ({ post }: PostDetailSectionProps) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const shortContentRef = useRef<HTMLDivElement>(null)
    const [modifiedContent, setModifiedContent] = useState<string>("")
    const [modifiedShortPost, setModifiedShortPost] = useState<string[]>([])
    const themeValueList = (post.themeList as (keyof typeof Theme)[]) || []

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
                    </div>
                </div>
                <div>
                    <span className="text-GREY-70 mx-4">여행일자</span>
                    <span className="text-BRAND-50 font-bold">{`${formatISODateString(post.tripStartDate)} ~ ${formatISODateString(post.tripEndDate)}`}</span>
                </div>
            </div>
            <div className="min-h-[280px] p-3">
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
                {post.content && (
                    <div
                        ref={contentRef}
                        dangerouslySetInnerHTML={{ __html: modifiedContent }}
                        className="custom-content py-2"
                    />
                )}
                {post.memos?.map((post: memos, index: number) => (
                    <div className="w-full flex flex-col justify-center items-start" key={post.id}>
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
                ))}
            </div>
            <div
                className={`w-full min-h-[59px] border-t-[1px] border-GREY-30 flex ${themeValueList.length > 7 ? "flex-col items-start" : "flex-row items-center"} justify-end`}
            >
                <span
                    className={`w-fit flex text-SYSTEM-black text-sm ${themeValueList.length > 7 ? "items-start pl-3" : "items-center"}`}
                >
                    기록한 여행의 컨셉 :
                </span>
                <span className="px-2">
                    {themeValueList.map((themeValue, index) => (
                        <span key={index} className="text-BRAND-50 text-sm font-bold p-1">
                            {`#${Theme[themeValue]}`}
                        </span>
                    ))}
                </span>
            </div>
        </div>
    )
}

export default PostDetailSection
