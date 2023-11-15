"use server";

import { CookiesValues } from "@/constants/Cookies";
import { backendUrl } from "@/constants/Urls";
import { UserSchemaLogin, UserSchemaRegister } from "@/schemas/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

type CreateUserInputs = z.infer<typeof UserSchemaRegister>

export async function CreateUser(data: CreateUserInputs) {

  const result = UserSchemaRegister.safeParse(data);

  if (result.success) {
    const user = {
      name: data.username as string,
      email: data.email as string,
      password: data.password as string,
    };

    const createdUser = await fetch(`${backendUrl}/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user)
    });

    const res: UserData = await createdUser.json();

    redirect("/login");

    return res;
  }
}

type LoginInputs = z.infer<typeof UserSchemaLogin>

export async function Login(data: LoginInputs) {

  const result = UserSchemaLogin.safeParse(data);

  if (result.success) {
    const user = {
      email: data.identifier as string,
      password: data.password as string
    };

    const res = await fetch(`${backendUrl}/users/auth`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(user)
    });

    const authRes: TSuccessLogin = await res.json();

    if (res.ok && authRes.token) {
      const time_to_live = data.connected ? 60 * 60 : 10;

      cookies().set("jwt", authRes.token, { maxAge: time_to_live });
      cookies().set("name", authRes.user.name, { maxAge: time_to_live });
      cookies().set("user_id", authRes.user.id, { maxAge: time_to_live });
      cookies().set(
        CookiesValues.name,
        authRes.user.user_type === "user" || authRes.user.user_type === null ? CookiesValues.user : CookiesValues.admin,
        { maxAge: time_to_live }
      );

      if (authRes.user.user_type === "user" || authRes.user.user_type === null) {
        if (authRes.user.gateway_id && !authRes.user.verified) {
          redirect("/verificacao/etapa-2");
        }

        redirect(authRes.user.verified ? "/home?verified=true" : "/verificacao");
      } else if (authRes.user.user_type === "admin") {
        redirect("/admin/dash");
      }
    }

    return authRes;
  }
}

export async function Logout() {
  cookies().delete("jwt");
  cookies().delete("name");
  cookies().delete("user_id");
  cookies().delete(CookiesValues.name);
  redirect("/logout");
}