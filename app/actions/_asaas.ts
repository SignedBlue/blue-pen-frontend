"use server";

import { cookies } from "next/headers";

import { AsaasSchema } from "@/schemas/Asaas";
import { z } from "zod";
import { cleanMask } from "@/utils/formatters";
import { getData } from "@/utils/getData";

type InputAsaas = z.infer<typeof AsaasSchema>

export async function SendAsaasData(data: InputAsaas) {

  const user_id = cookies().get("user_id")?.value;

  if (AsaasSchema.safeParse(data).success) {
    const asaasReq: InputAsaas = {
      address: data.address,
      addressNumber: data.addressNumber,
      birthDate: data.birthDate,
      complement: data.complement,
      cpfCnpj: cleanMask(data.cpfCnpj),
      mobilePhone: cleanMask(data.mobilePhone),
      phone: cleanMask(data.phone as string),
      postalCode: cleanMask(data.postalCode),
      province: data.province,
      user_id: user_id,
    };

    await getData("/users/account", {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(asaasReq)
    });

    // cookies().set("asaas_sended", "true");
    // redirect("/verificacao/etapa-2");

  }
}