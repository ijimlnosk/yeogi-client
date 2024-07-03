"use client"

import Button from "@/components/commons/button"
import RecommendText from "./recommendText"
import { useEffect, useRef } from "react"

const MainRecommend = () => {
    const videoRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const Video = videoRef.current?.querySelector("video")
        if (!Video) return

        /**
         * @function handleIntersection 관찰 대상 요소가 화면에 50% 이상 보일 때만 비디오를 재생
         * @param {IntersectionObserverEntry[]} entries IntersectionObserverEntry 객체의 배열로 각 객체는 관찰되고 있는 요소의 교차 상태를 나타냄
         */
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Video.play()
                } else {
                    Video.pause()
                }
            })
        }
        // Intersection Observer 설정
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            threshold: 0.5,
        })
        observer.observe(Video)

        // cleanup function(클린업 함수)
        return () => {
            observer.unobserve(Video)
        }
    }, [])

    return (
        <div className="w-full h-[1000px] flex justify-evenly items-center" ref={videoRef}>
            <div className="flex flex-col justify-start">
                <RecommendText />
                <Button background={"black"} textColor={"white"} rounded={"xl"} className="w-[190px] h-12">
                    취향 검사하러 가기
                </Button>
            </div>
            <div className="w-[1052px] h-[740px] bg-[#F7EDE0] border-[3px] border-[#EADCCE] rounded-3xl flex justify-center items-center overflow-hidden">
                <video autoPlay loop muted preload="auto" playsInline className="w-full">
                    <source src="/video/recommendVideo_crop.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    )
}
export default MainRecommend
