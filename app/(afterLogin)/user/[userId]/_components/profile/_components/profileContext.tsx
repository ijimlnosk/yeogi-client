import EditField from "../editField"
import { ProfileContextProps } from "./type"

const ProfileContext = ({ nickname, motto, onFieldChange }: ProfileContextProps) => {
    return (
        <div className="ml-10 mt-[143px]">
            <EditField
                value={nickname}
                onChange={e => onFieldChange("nickname")(e as React.ChangeEvent<HTMLInputElement>)}
                type="input"
                maxLength={10}
                className="mb-4 text-4xl font-semibold w-fit"
            />
            <EditField
                value={motto || ""}
                onChange={e => onFieldChange("motto")(e as React.ChangeEvent<HTMLInputElement>)}
                type="input"
                maxLength={40}
                className="text-lg w-fit"
            />
        </div>
    )
}
export default ProfileContext
