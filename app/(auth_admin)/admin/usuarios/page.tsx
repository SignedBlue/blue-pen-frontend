import { Metadata } from "next";
import { cookies } from "next/headers";
import UsersList from "./UsersList";
import { getData } from "@/utils/getData";

export const metadata: Metadata = {
  title: "Usuários"
};

export default async function UsersPage() {
  const tokenValue = cookies().get("jwt")?.value;

  const users: DataResponse = await getData("/users", {
    headers: {
      "Authorization": `Bearer ${tokenValue}`,
    },
  });

  return <UsersList users={users.data} />;
}