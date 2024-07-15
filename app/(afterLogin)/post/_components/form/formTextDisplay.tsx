import { TextDisplayProps } from "../overlay/type"

const TextDisplay = ({ condition, texts, label }: TextDisplayProps) => {
    const filteredTexts = texts.filter(text => text !== "")
    return condition && filteredTexts.length > 0 ? (
        <div className="text-BRAND-50">
            {filteredTexts.map((text, index) => (
                <span key={index}>
                    {text}
                    {index < filteredTexts.length - 1 && <span> / </span>}
                </span>
            ))}
        </div>
    ) : (
        <div className="text-GREY-80">{label}</div>
    )
}
export default TextDisplay
