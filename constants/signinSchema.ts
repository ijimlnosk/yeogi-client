import { z } from "zod";

export const SigninSchema = z.object({
    email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요" }).optional(),
    password: z
        .string()
        .regex(/^(?=.*[!@#$%^&*])(.{8,})$/, {
            message: "특수문자 포함 10자 이하로  입력해주세요",
        })
        .min(8)
        .optional(),
});

export const SignupSchema = z.object({
    email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요" }).optional(),
    password: z
        .string()
        .regex(/^(?=.*[!@#$%^&*])(.{8,})$/, {
            message: "영문, 숫자, 특수문자 포함 8글자 이상 입력해주세요",
        })
        .min(8)
        .optional(),
    confirmPassword: z.string(),
    nickName: z
        .string()
        .regex(/^.{4,10}$/, { message: "닉네임은 4자 이상 10자 이하로 입력해주세요" })
}).refine(data => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"], // 에러 메시지가 표시될 경로
});
