import PinCard from "./pinCard"
import { PinCardGridProps } from "./type"

const PinCardGrid = ({ pins }: PinCardGridProps) => (
    <div className="h-[330px] my-8 grid grid-cols-3 gap-[30px]">
        {pins.map(pin => (
            <div key={pin.pinId}>
                <PinCard pin={pin} />
            </div>
        ))}
    </div>
)

export default PinCardGrid
