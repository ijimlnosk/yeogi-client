import { useSearchStore } from "@/libs/zustand/search"
import Image from "next/image"

const HeaderSearchBar = () => {
    const { isSearchOpen, setIsSearchOpen } = useSearchStore()

    const handleSearchOpen = () => {
        setIsSearchOpen(!isSearchOpen)
    }

    return (
        <button onClick={handleSearchOpen}>
            <Image
                src={"/icons/search.svg"}
                width={24}
                height={24}
                className="min-w-6 min-h-6 hidden sm:block"
                alt="search_icon"
            />
        </button>
    )
}
export default HeaderSearchBar
