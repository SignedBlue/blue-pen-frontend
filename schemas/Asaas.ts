import { z } from "zod";

const AsaasSchema = z.object({
  user_id: z.string().optional(),

  cpfCnpj: z.string().nonempty(),
  birthDate: z.string(),

  phone: z.string().optional(),
  mobilePhone: z.string().nonempty(),

  address: z.string().nonempty(),
  addressNumber: z.string().nonempty(),
  complement: z.string().optional(),

  province: z.string().nonempty(),
  postalCode: z.string().nonempty(),
});

export { AsaasSchema };