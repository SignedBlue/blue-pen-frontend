import { z } from "zod";

const UserSchemaLogin = z.object({
  identifier: z
    .string()
    .min(1, "Por favor, forneça um identificador válido.")
    .email("O email fornecido é inválido."),
  password: z
    .string()
    .min(1, "A senha não pode ser deixada em branco.")
  ,
  connected: z
    .boolean()
    .optional()
});

const UserSchemaRegister = z.object({
  username: z
    .string()
    .min(1, "Por favor, insira um nome válido."),
  email: z
    .string()
    .min(1, "O email não pode ser deixado em branco.")
    .email("O email fornecido é inválido."),
  password: z
    .string()
    .min(1, "A senha não pode ser deixada em branco.")
    .trim()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." })
    .refine(value => /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/.test(value), {
      message: "A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial."
    })
});

export { UserSchemaLogin, UserSchemaRegister };
