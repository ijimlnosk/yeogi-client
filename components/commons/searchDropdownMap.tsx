import Button from "./button"
import { SearchDropdownMapProps } from "./type"

const SearchDropdownMap = ({ dropdownItem, onClick, index }: SearchDropdownMapProps) => {
    return (
        <div className="w-full flex flex-wrap sm:gap-3.5 justify-start my-[18px] text-xs break-keep">
            {dropdownItem.map(([key, value], idx) => (
                <Button
                    key={key}
                    onClick={() => onClick(idx)}
                    background={index === idx ? "brand30" : "white"}
                    textColor={index === idx ? "white" : "black"}
                    className={`w-fit h-[42px] px-4 py-2.5 mr-4 gap-2 sm:mr-0 rounded-lg border-[1px] border-BRAND-50`}
                >
                    {value}
                </Button>
            ))}
        </div>
    )
}
export default SearchDropdownMap
