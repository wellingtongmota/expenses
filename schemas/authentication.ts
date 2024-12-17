import { z } from "zod"

export const loginSchema = z.object({
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
