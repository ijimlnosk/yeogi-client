import Image from "next/image"
import { PinCardPorps } from "./type"
import { formatISODateString } from "@/utils/date.utils"
import { useState } from "react"
import UpdatedWorldMapModal from "./updatedWorldMapModal"

const PinCard = ({ pin }: PinCardPorps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <UpdatedWorldMapModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            {!isOpen ? (
                <div
                    onClick={() => setIsOpen(true)}
                    className="w-[150px] h-[150px] px-3 flex flex-col justify-center items-center bg-SYSTEM-else rounded-lg cursor-pointer"
                >
                    <div className="pb-2">{pin.country}</div>
                    <div className=" relative w-[42px] h-14">
                        <Image src={"/images/pin.svg"} fill alt="Pin" />
                    </div>
                    <div className="pt-3"> {formatISODateString(pin.createdAt)} 기록</div>
                </div>
            ) : (
                <div></div>
            )}
        </>
    )
}

export default PinCard
