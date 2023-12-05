"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { CookiesValues } from "@/constants/Cookies";

import { UserSchemaLogin, UserSchemaRegister, UserSchemaUpdateInfos } from "@/schemas/User";
import { getData } from "@/utils/getData";

// libs
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { backendUrl } from "@/constants/Urls";
import { cleanMask } from "@/utils/formatters";

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
      cache: "no-cache",
      body: JSON.stringify(user)
    });

    // if (createdUser.statusCode !== 409) {
    //   redirect("/login");
    // }

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
      const week = 60 * 60 * 24 * 7;
      const hour = 60 * 60;

      const time_to_live = data.connected ? week : hour;

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

        if (!authRes.user.gateway_id) {
          redirect("/verificacao");
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

type UpdateInputs = z.infer<typeof UserSchemaUpdateInfos>

export async function UpdateUserInfos(data: UpdateInputs) {

  if (UserSchemaUpdateInfos.safeParse(data).success) {
    const user_id = cookies().get("user_id")?.value;
    const token = cookies().get("jwt")?.value;

    const updatedUser = {
      user_id: user_id,
      name: data.name,
      phone: cleanMask(data.phone as string),
      address: {
        city: data.city,
        number: data.addressNumber,
        street: data.address,
        complement: data.complement,
        postal_code: data.postalCode
      },
    };


    const res = await fetch(`${backendUrl}/users/${user_id}`, {
      method: "PATCH",
      cache: "no-cache",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedUser)
    });

    const ress: TUserData = await res.json();

    cookies().set("name", ress.name);
    revalidateTag("user_infos");

    return ress;
  }

}

export async function ForgotPassword(email: string) {
  await getData("/users/reset-password", {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      email
    })
  });
}