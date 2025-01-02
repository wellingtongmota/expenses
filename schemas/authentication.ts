import { z } from "zod"

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "E-mail é obrigatório" })
    .min(1, "E-mail é obrigatório")
    .email("E-mail inválido"),
  password: z
    .string({ required_error: "Senha é obrigatória" })
    .min(1, "Senha é obrigatória")
    .min(4, "A senha deve ter mais de 4 caracteres")
    .max(32, "A senha deve ter menos de 32 caracteres")
})

export const RegisterNewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
      .regex(/[a-z]/, {
        message: "A senha deve conter pelo menos uma letra minúscula."
      })
      .regex(/[A-Z]/, {
        message: "A senha deve conter pelo menos uma letra maiúscula."
      })
      .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número." })
      .regex(/[\W_]/, {
        message: "A senha deve conter pelo menos um caractere especial."
      }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem."
  })
