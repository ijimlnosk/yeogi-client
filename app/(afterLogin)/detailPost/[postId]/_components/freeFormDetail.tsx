"use client"

import { useEffect, useRef } from "react"
import { PostDetailProps } from "./type"

const FreeFormDetail = ({ title, content, author, created_At, country, travel_range }: PostDetailProps) => {
    const contentRef = useRef<HTMLDivElement>(null)

    const wrapImagesWithDiv = (html: string) => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, "text/html")

        const temp = doc.querySelectorAll("p")
        temp.forEach(p => {
            const images = p.querySelectorAll("img")
            images.forEach(img => {
                const div = document.createElement("div")
                div.className = "image-container"
                p.parentNode?.insertBefore(div, p)
                const newImg = document.createElement("img")
                newImg.src = "/images/tape.svg"
                newImg.className = "image-tape"
                div.appendChild(newImg)
                div.appendChild(img)
            })
            if (p.textContent?.trim() === "") {
                p.parentNode?.removeChild(p)
            }
        })

        return doc.body.innerHTML
    }

    useEffect(() => {
        if (content && contentRef.current) {
            const modifiedContent = wrapImagesWithDiv(content)
            contentRef.current.innerHTML = modifiedContent
            console.log(modifiedContent, "modifiedContent")
        }
    }, [content])

    return (
        <div className="w-[1000px] bg-comment-pattern bg-SYSTEM-beige h-auto flex items-center justify-center flex-col border-2 border-GREY-50 rounded-2xl py-5">
            <div className="w-[960px] border-2 border-GREY-30 rounded-2xl p-5 ">
                <div className="w-full flex justify-between border-t-2 border-b-2 p-2 border-GREY-30">
                    <p>
                        게시일 : <span className="font-bold">{created_At}</span>
                    </p>
                    <p>
                        작성자 : <span className="text-BRAND-50">{author}</span>
                    </p>
                </div>
                <div className="pt-[20px]">
                    <div className="flex items-center justify-center py-5 border-t-2 border-b-2 border-BRAND-50">
                        <p className="text-xxl">{title}</p>
                    </div>
                    <div className="mt-[10px] py-2.5 flex flex-row justify-between items-center  border-t-2 border-GREY-30">
                        <div className="w-[143px]">
                            <p className="flex justify-between">
                                여행지 <span className="text-BRAND-50 font-bold">{country}</span>
                            </p>
                        </div>
                        <div className="w-[282px]">
                            <p className="flex justify-between">
                                여행일자 <span className="text-BRAND-50 font-bold">{travel_range}</span>
                            </p>
                        </div>
                    </div>

                    <div>
                        {content && (
                            <div
                                ref={contentRef}
                                dangerouslySetInnerHTML={{ __html: content }}
                                className="py-5 custom-free-content"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FreeFormDetail
