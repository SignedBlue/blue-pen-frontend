import { z } from "zod";

const UserSchemaLogin = z.object({
  identifier: z
    .string()
    .min(1, "Identificador não pode ser nulo"),
  password: z
    .string()
    .min(1, "Senha não pode ser nula")
  ,
  connected: z
    .boolean()
    .optional()
});

const UserSchemaRegister = z.object({
  username: z
    .string()
    .min(1, "Identificador não pode ser nulo"),
  email: z
    .string()
    .email(),
  password: z
    .string()
    .min(1, "Senha não pode ser nula")
    .trim()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .refine(value => /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/.test(value), {
      message: "A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial."
    })
});

export { UserSchemaLogin, UserSchemaRegister };
