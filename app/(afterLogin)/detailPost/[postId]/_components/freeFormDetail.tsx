"use client"

import { useEffect, useRef } from "react"
import { PostDetailProps } from "./type"

const FreeFormDetail = ({ title, continent, content, author, created_At, country, travel_range }: PostDetailProps) => {
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
        /* 이 부분은 추후 detail 페이지의 스타일을 잡는데 유용하게 쓰일 수 있으므로 남겨두겠습니다. */
        if (content && contentRef.current) {
            const modifiedContent = wrapImagesWithDiv(content)
            contentRef.current.innerHTML = modifiedContent
            // console.log(modifiedContent, "modifiedContent")
        }
    }, [content])

    return (
        <div className="w-[1000px] bg-post-pattern bg-SYSTEM-beige h-auto flex items-center justify-center flex-col border-y-2 border-GREY-30">
            <div>
                <div className="flex items-center justify-start py-5">
                    <p className="text-xxl">{title}</p>
                </div>
                <div className="w-full flex justify-between border-t-2 border-b-2 py-2 border-GREY-30">
                    <div>
                        <p>
                            <span className="text-BRAND-50 font-bold mx-4">{author}</span>
                            <span className="text-GREY-70 mx-4">{created_At}</span>
                        </p>
                    </div>
                    <div className="flex flex-row">
                        <p className="mx-2">
                            <span className="text-GREY-70 mx-4">여행지</span>
                            <span className="text-BRAND-50 font-bold">{continent},</span>
                            <span className="text-BRAND-50 font-bold">{country}</span>
                        </p>
                        <p className="mx-4">
                            <span className="text-GREY-70 mx-4">여행일자</span>
                            <span className="text-BRAND-50 font-bold">{travel_range}</span>
                        </p>
                    </div>
                </div>
                <div className="pt-[20px]">
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
