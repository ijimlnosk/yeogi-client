export type HeaderSearchBarProps = {
    isSearchBarClicked: boolean
    setIsSearchBarClicked: (isSearchBarClicked: boolean) => void
}

export type HeaderLoginProps = {
    isShowHeader: boolean
}

export type UserDialogProps = {
    userId: number | undefined
    setIsProfileClicked: (isProfileClicked: boolean) => void
}
export type footerProps = {
    userId: number | undefined
}
