// import Calendar2 from "@/components/commons/calandar2"
import Calendar from "@/components/commons/calendar"

export default function Home() {
    return (
        <div className="p-4">
            {/* <Calendar2 /> */}
            <Calendar />
            <h1 className="font-myeongjo text-title text-BRAND-50">
                This is the Nanum Myeongjo font with BRAND 50 color.
            </h1>
            <p className="font-pretendard text-md text-SYSTEM-black">
                This is the Pretendard font with SYSTEM black color.
            </p>
            <div className="mt-4 p-4 bg-GREY-10">
                <h2 className="text-subTitle text-ACCENT-orange">Subtitle with ACCENT orange color.</h2>
                <p className="text-sm text-GREY-70">Some description with GREY 70 color.</p>
            </div>
        </div>
    )
}
