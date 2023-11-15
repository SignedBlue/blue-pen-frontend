import { z } from "zod";

const AsaasSchema = z.object({
  user_id: z.
    string().
    optional(),
  cpfCnpj: z.
    string()
    .min(1, "Campo obrigatório"),
  birthDate: z.string(),

  phone: z.string().optional(),
  mobilePhone: z.
    string()
    .min(1, "Campo obrigatório"),

  address: z.
    string()
    .min(1, "Campo obrigatório"),
  addressNumber: z.
    string()
    .min(1, "Campo obrigatório"),
  complement: z.string().optional(),

  province: z.
    string()
    .min(1, "Campo obrigatório"),
  postalCode: z.
    string()
    .min(1, "Campo obrigatório"),
});

export { AsaasSchema };