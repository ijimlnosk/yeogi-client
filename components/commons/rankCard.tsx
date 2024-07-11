import Image from "next/image"

const RankCard = () => {
    return (
        <div className="w-[506px] h-[400px] relative">
            <div className=" absolute">
                <Image src={"/public/icons/gps.svg"} alt="gps" width={16} height={16} />
                <p>유럽</p>
            </div>
        </div>
    )
}
export default RankCard
