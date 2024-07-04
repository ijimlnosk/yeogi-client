import Image from "next/image"
import { CountrySearchBarProps } from "./type"

const CountrySearchBar = ({ text, onChange }: CountrySearchBarProps) => {
    return (
        <form className="max-w-auto mx-auto">
            <div className="relative ">
                <div className=" absolute inset-y-0 p-6 placeholder:start-0 flex items-center pointer-events-none">
                    <Image src={"/icons/search.svg"} alt="search_icon" width={24} height={24} />
                </div>
                <div>
                    <input
                        type="search"
                        id="default-search"
                        className="block border w-[400px] h-[48px] p-2 ps-14 bg-GREY-10 rounded-lg  outline-none focus:ring-transparent focus:ring-0 focus:border-SYSTEM-none "
                        placeholder={text}
                        required
                        onChange={onChange}
                    />
                </div>
            </div>
        </form>
    )
}
export default CountrySearchBar
