import { UserInfoProps } from "../type"

export type HeaderLoginProps = {
    isLoggedIn: boolean
    userInfo: UserInfoProps | undefined
}

export type HeaderSearchBarProps = {
    isSearchBarClicked: boolean
    setIsSearchBarClicked: (isSearchBarClicked: boolean) => void
}
