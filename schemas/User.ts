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

const UserSchemaUpdateInfos = z.object({
  name: z
    .string()
    .optional(),
  phone: z
    .string()
    .optional(),
  mobilePhone: z
    .string()
    .optional(),
  address: z
    .string()
    .optional(),
  addressNumber: z
    .string()
    .optional(),
  complement: z
    .string()
    .optional(),
  city: z
    .string()
    .optional(),
  postalCode: z
    .string()
    .optional(),
  // password: z
  //   .string()
  //   .min(1, "Digite a senha atual para confirmar, ou altere-a.")
  //   .trim()
  //   .min(6, { message: "A senha deve ter pelo menos 6 caracteres." })
  //   .refine(value => /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/.test(value), {
  //     message: "A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial."
  //   })
});

export {
  UserSchemaLogin,
  UserSchemaRegister,
  UserSchemaUpdateInfos
};
