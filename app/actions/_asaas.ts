"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AsaasSchema } from "@/schemas/Asaas";
import { z } from "zod";
import { backendUrl } from "@/constants/Urls";
import { cleanMask } from "@/utils/formatters";

type InputAsaas = z.infer<typeof AsaasSchema>

export async function SendAsaasData(data: InputAsaas) {
  const result = AsaasSchema.safeParse(data);

  const user_id = cookies().get("user_id")?.value;

  if (result.success) {
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


    await fetch(`${backendUrl}/users/account`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(asaasReq)
    });

    cookies().set("asaas_sended", "true");
    redirect("/verificacao/etapa-2");

  }
}