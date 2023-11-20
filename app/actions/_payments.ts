"use server";

import { getData } from "@/utils/getData";
import { revalidateTag } from "next/cache";

export async function DeletePayment(paymentId: string) {
  await getData(`/payments/${paymentId}`, {
    method: "DELETE",
  });

  revalidateTag("payments");
}