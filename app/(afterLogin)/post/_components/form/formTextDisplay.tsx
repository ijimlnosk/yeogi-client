import { TextDisplayProps } from "../overlay/type"

const TextDisplay = ({ condition, texts, label }: TextDisplayProps) => {
    return condition ? (
        <div className="text-BRAND-50">
            {texts.map((text, index) => (
                <span key={index}>
                    {text}
                    {index < texts.length - 1 && <span> / </span>}
                </span>
            ))}
        </div>
    ) : (
        <div>{label}</div>
    )
}
export default TextDisplay
