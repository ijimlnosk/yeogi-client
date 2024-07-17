import { UserInfoType } from "@/types/user"

export type HeaderLoginProps = {
    isLoggedIn: boolean
    userInfo: UserInfoType | undefined
}

export type HeaderSearchBarProps = {
    isSearchBarClicked: boolean
    setIsSearchBarClicked: (isSearchBarClicked: boolean) => void
}
