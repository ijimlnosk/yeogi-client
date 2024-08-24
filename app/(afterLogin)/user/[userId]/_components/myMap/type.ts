import { Pin } from "@/apis/type"
import { UserInfoType } from "@/types/user"

export type MyPinListProps = {
    isOpen: boolean
    onClose: () => void
}

export type PinCardPorps = {
    pin: Pin
}

export type WoldMapProps = {
    userInfo: UserInfoType
}

export type PinCardGridProps = {
    pins: Pin[]
}

export type PinListPaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export type UpdatedWorldMapModalProps = {
    pinId: number
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    onClose: () => void
}

export type PinPosition = {
    x: number
    y: number
}

export type PinModalProps = {
    isOpen: boolean
    onClick: () => void
    onLeftClick: () => void
}
