"use server";

import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { backendUrl } from "@/constants/Urls";
import { cookies } from "next/headers";

export async function CreateContract(data: INewContract) {
  const user_id = cookies().get("user_id")?.value;

  const response = await fetch(`${backendUrl}/contracts`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data)
  });

  const res: TContract = await response.json();

  if (response?.ok) {
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
      fetch(`${backendUrl}/contract-users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(admin_body)
      }),
      fetch(`${backendUrl}/contract-users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user_body)
      })
    ]);

    revalidateTag("contracts");
    redirect("/admin/contratos");
  }
}

export async function RequestToken(contract_id: string) {
  const user_id = cookies().get("user_id")?.value;

  const res = await fetch(`${backendUrl}/contract-users/token`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      user_id: user_id,
      contract_id: contract_id
    })
  });

  if (res?.ok) {
    return res;
  }
}

export async function SignContract({ token, contract_id }: { token: string; contract_id: string }) {
  const user_id = cookies().get("user_id")?.value;

  const res = await fetch(`${backendUrl}/contracts/sign`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
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

  if (res?.ok) {
    return res;
  }
}