"use server";

import { cookies } from "next/headers";

import { AsaasSchema } from "@/schemas/Asaas";
import { z } from "zod";
import { cleanMask } from "@/utils/formatters";
import { backendUrl } from "@/constants/Urls";

type InputAsaas = z.infer<typeof AsaasSchema>

export async function SendAsaasData(data: InputAsaas) {

  const user_id = cookies().get("user_id")?.value;
  const tokenValue = cookies().get("jwt")?.value;

  if (AsaasSchema.safeParse(data).success) {
    const asaasReq: InputAsaas = {
      address: data.address,
      addressNumber: data.addressNumber,
      birthDate: data.birthDate,
      complement: data.complement,
      cpfCnpj: cleanMask(data.cpfCnpj),
      mobilePhone: cleanMask(data.mobilePhone),
      phone: data.phone ? cleanMask(data.phone as string) : cleanMask(data.mobilePhone as string),
      postalCode: cleanMask(data.postalCode),
      province: data.province,
      user_id: user_id,
    };

    const res = await fetch(`${backendUrl}/users/account`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Authorization": `Bearer ${tokenValue}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(asaasReq)
    });

    const resss = await res.json();

    return resss;
  }
}