"use server";

import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { getData } from "@/utils/getData";

export async function CreateContract(data: INewContract) {
  const user_id = cookies().get("user_id")?.value;

  const res: TContract = await getData("/contracts", {
    method: "POST",
    body: JSON.stringify(data)
  });


  const admin_body: ContractUsers = {
    contract_id: res.id,
    user_id: user_id as string,
    user_type: "admin"
  };

  const user_body: ContractUsers = {
    contract_id: res.id,
    user_id: data.client_id as string,
    user_type: "client"
  };

  await Promise.all([
    getData("/contract-users", {
      method: "POST",
      body: JSON.stringify(admin_body)
    }),
    getData("/contract-users", {
      method: "POST",
      body: JSON.stringify(user_body)
    })
  ]);

  revalidateTag("contracts");
  redirect("/admin/contratos");
}

export async function RequestToken(contract_id: string) {
  const user_id = cookies().get("user_id")?.value;

  const res = await getData("/contract-users/token", {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      user_id: user_id,
      contract_id: contract_id
    })
  });

  return res;
}

export async function SignContract({ token, contract_id }: { token: string; contract_id: string }) {
  const user_id = cookies().get("user_id")?.value;

  const res = await getData("/contracts/sign", {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      user_id: user_id,
      contract_id: contract_id,
      token: token,
      metadata: {
        ip: ""
      }
    })
  });

  return res;
}

export async function CancelContract(contract_id: string) {
  const user_id = cookies().get("user_id")?.value;

  const res = await getData(`/contracts/${contract_id}`, {
    method: "PATCH",
    cache: "no-cache",
    body: JSON.stringify({
      termination_date: new Date(),
      termination_by: user_id
    })
  });

  revalidateTag("single_contract");

  return res;
}