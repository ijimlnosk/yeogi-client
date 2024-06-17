import WorldMap from "@/app/(afterLogin)/user/[userId]/_components/myMap/worldMap"
import Overlay from "@/components/commons/overlay"
import { MyMapOverlayProps } from "./type"
import { useMapStore } from "@/libs/storePin"
import { WorldPost } from "@/app/(afterLogin)/user/[userId]/_components/myMap/type"

const MyMapOverlay = ({ isMapOverlayOpen }: MyMapOverlayProps) => {
    const { setPins } = useMapStore()

    const handleComplete = (newPin: WorldPost[]) => {
        setPins([...newPin])
    }

    return (
        <Overlay isOpen={isMapOverlayOpen} onClick={() => handleComplete([])}>
            <div className="flex flex-col items-center">
                <p className="text-bg text-GREY-20 text-center">
                    기록 업로드를 완료했어요! <br /> 여행 핀을 지도 위에 표시해{" "}
                    <span className="text-SYSTEM-white">당신만의 세계지도</span>를 만들어주세요!
                </p>
                <div className="flex flex-col items-end">
                    <WorldMap
                        user={{
                            nickName: "Amy",
                            posts: [],
                        }}
                        editable={true}
                    />
                    <button className="bg-SYSTEM-white px-5 py-3 rounded-[12px] text-md mr-5">지도 저장</button>
                </div>
            </div>
        </Overlay>
    )
}
export default MyMapOverlay
