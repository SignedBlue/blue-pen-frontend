"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { CookiesValues } from "@/constants/Cookies";

import { UserSchemaLogin, UserSchemaRegister } from "@/schemas/User";
import { getData } from "@/utils/getData";

// libs
import { z } from "zod";

type CreateUserInputs = z.infer<typeof UserSchemaRegister>

export async function CreateUser(data: CreateUserInputs) {

  if (UserSchemaRegister.safeParse(data).success) {
    const user = {
      name: data.username as string,
      email: data.email as string,
      password: data.password as string,
    };

    const createdUser: TCreatedUser = await getData("/users", {
      method: "POST",
      body: JSON.stringify(user)
    });

    if (createdUser.statusCode !== 409) {
      redirect("/login");
    }

    return createdUser;
  }
}

type LoginInputs = z.infer<typeof UserSchemaLogin>

export async function Login(data: LoginInputs) {

  if (UserSchemaLogin.safeParse(data).success) {
    const user = {
      email: data.identifier as string,
      password: data.password as string
    };

    const authRes: TAuthResponse = await getData("/users/auth", {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(user)
    });


    if ("token" in authRes) {
      const time_to_live = data.connected ? 60 * 60 : 10;

      cookies().set("jwt", authRes.token, { maxAge: time_to_live, secure: true, httpOnly: true });
      cookies().set("name", authRes.user.name, { maxAge: time_to_live, secure: true, httpOnly: true });
      cookies().set("user_id", authRes.user.id, { maxAge: time_to_live, secure: true, httpOnly: true });
      cookies().set(
        CookiesValues.name,
        authRes.user.user_type === "client" || authRes.user.user_type === null ? CookiesValues.user : CookiesValues.admin,
        { maxAge: time_to_live, secure: true, httpOnly: true }
      );

      if (authRes.user.user_type === "client" || authRes.user.user_type === null) {
        if (authRes.user.gateway_id && !authRes.user.verified) {
          redirect("/verificacao/etapa-2");
        }

        redirect(authRes.user.verified ? "/home?verified=true" : "/verificacao");
      } else if (authRes.user.user_type === "admin") {
        redirect("/admin/dash");
      }
    } else {
      const errorResponse = authRes as TErrorLogin;

      return errorResponse;
    }
  }
}

export async function Logout() {
  cookies().delete("jwt");
  cookies().delete("name");
  cookies().delete("user_id");
  cookies().delete(CookiesValues.name);
  redirect("/logout");
}