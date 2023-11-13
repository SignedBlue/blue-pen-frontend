import { z } from "zod";

export const NewContractSchema = z.object({
  duration: z
    .string()
    .min(1, "Campo obrigatório")
  ,
  start_date: z
    .string()
    .min(1, "Campo obrigatório")
  ,
  client_id: z
    .string()
    .min(1, "Campo obrigatório")
});
