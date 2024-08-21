import { useSearchStore } from "@/libs/zustand/search"
import Image from "next/image"

const HeaderSearchBar = () => {
    const { isSearchOpen, setIsSearchOpen } = useSearchStore()

    const handleSearchOpen = () => {
        setIsSearchOpen(!isSearchOpen)
    }

    return (
        <Image
            src={"/icons/search.svg"}
            width={24}
            height={24}
            className="hidden sm:block h-auto w-auto"
            alt="search icon"
            onClick={handleSearchOpen}
        />
    )
}
export default HeaderSearchBar
