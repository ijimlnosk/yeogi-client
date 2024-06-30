type Props = {
    width?: number
    height?: number
    circle?: boolean // 원형 스켈레톤
    rounded?: boolean // 모서리
    unit?: string // px 또는 % 단위
    animation?: boolean // 애니메이션 유무
    color?: string
}

const Skeleton = ({ animation = true, width, height, circle, rounded, unit = "px", color = "bg-red-200" }: Props) => {
    const baseClasses = `${color} ${rounded ? "rounded-lg" : ""} ${circle ? "rounded-full" : ""} ${animation ? "animate-pulse" : ""}`
    const sizeStyles = {
        width: width ? `${width}${unit}` : "auto",
        height: height ? `${height}${unit}` : "auto",
    }

    return (
        <div className={`skeleton ${baseClasses}`} style={{ ...sizeStyles }}>
            <span className="opacity-0">.</span>
        </div>
    )
}

export default Skeleton
