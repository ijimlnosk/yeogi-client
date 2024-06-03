import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * tailwind 를 merge할때 발생할 수 있는 클래스 충돌 문제를 해결해주는 함수
 */
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};