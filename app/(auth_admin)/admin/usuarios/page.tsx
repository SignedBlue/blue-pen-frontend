import { Metadata } from "next";
import { cookies } from "next/headers";
import UsersList from "./UsersList";
import { getData } from "@/utils/getData";
import LoadingSkeleton from "@/app/components/LoadingSkeleton";
import { Suspense } from "react";

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

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <UsersList users={users.data} />
    </Suspense>
  );
}