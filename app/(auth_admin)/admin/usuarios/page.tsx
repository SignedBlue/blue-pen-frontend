import { backendUrl } from "@/constants/Urls";
import { Metadata } from "next";
import { cookies } from "next/headers";
import UsersList from "./UsersList";

export const metadata: Metadata = {
  title: "Usuários"
};

export default async function UsersPage() {
  const tokenValue = cookies().get("jwt")?.value;

  const users_res = await fetch(`${backendUrl}/users`, {
    headers: {
      "Authorization": `Bearer ${tokenValue}`,
      "Content-Type": "application/json",
    },
    cache: "no-cache"
  });

  const users: DataResponse = await users_res.json();

  return <UsersList users={users.data} />;
}