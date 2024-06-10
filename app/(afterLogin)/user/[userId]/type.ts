import { StaticImageData } from "next/image"

export type Profile = {
    name: string
    bio: string
    profileImage: string | StaticImageData
    backgroundImage: string | StaticImageData
}

export type ProfileProps = Profile & {
    onEdit: () => void
}

export type EditProfileProps = Profile & {
    onSave: (profile: Profile) => void
    onCancel: () => void
}
