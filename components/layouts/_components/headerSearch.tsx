import { useSearchStore } from "@/libs/zustand/search"
import Image from "next/image"
import SearchIcon from "@/public/icons/search.svg"

const HeaderSearchBar = () => {
    const { isSearchOpen, setIsSearchOpen } = useSearchStore()

    const handleSearchOpen = () => {
        setIsSearchOpen(!isSearchOpen)
    }

    return (
        <Image
            src={SearchIcon}
            width={24}
            height={24}
            className="hidden sm:block "
            alt="search icon"
            onClick={handleSearchOpen}
        />
    )
}
export default HeaderSearchBar
