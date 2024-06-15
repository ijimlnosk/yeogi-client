import clsx from "clsx"
import { ReactNode } from "react"
import { FieldErrors, Path, RegisterOptions, UseFormRegister } from "react-hook-form"

// 폼데이터 인터페이스 정의
type FormValues = {
    email: string
    password: string
    data?: {
        nickName: string
    }
}

type InputProps<TFieldValues extends FormValues> = {
    name: Path<TFieldValues>
    type?: "text" | "password"
    placeholder?: string
    validation?: RegisterOptions
    className?: string
    register: UseFormRegister<TFieldValues>
    errors: FieldErrors<TFieldValues>
}

/**
 * @component Input 공용 컴포넌트
 * @template TFieldValues
 *
 * @param {Object} props
 * @param {Path<TFfieldValues>} props.name - 이름
 * @param {'text'|'password'} [props.type='text'] - 타입
 * @param {string} props.placeholder - 플레이스홀더
 * @param {RegisterOptions} [props.validation] - 유효성 검사 규칙
 * @param {string} [props.className] - 추가할 tailwind css
 * @param {UseFormRegister<TFieldValues>} props.register - RHF의 register 함수
 * @param {FieldErrors<TFieldValues>} props.errors - RHF의 오류 객체
 *
 * @returns {JSX.Element}
 *
 * @author: Gang
 */

const Input = <TFieldValues extends FormValues>({
    name,
    type = "text",
    placeholder,
    className,
    register,
    errors,
}: InputProps<TFieldValues>): JSX.Element => {
    const error = errors[name as keyof FieldErrors<TFieldValues>]

    return (
        <div className="input-wrapper relative">
            <input
                {...register(name)}
                type={type}
                placeholder={placeholder}
                className={clsx("border-2 p-2 rounded-md shadow-sm ", className)}
            />
            {error && <div className="text-SYSTEM-red text-ti text-center">{error.message as ReactNode}</div>}
        </div>
    )
}

export default Input
