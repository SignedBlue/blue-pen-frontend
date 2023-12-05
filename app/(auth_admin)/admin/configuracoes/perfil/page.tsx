import { getData } from "@/utils/getData";
import { cookies } from "next/headers";
import ChangeProfileInfos from "../../../../components/ChangeProfileInfos";
import { Suspense } from "react";
import ProfileSkeleton from "@/app/components/skeletons/ProfileSkeleton";

export default async function ConfigProfilePage() {
  const user_id = cookies().get("user_id")?.value;

  const res: TUserData = await getData(`/users/${user_id}`, {
    cache: "no-cache",
    next: {
      tags: ["user_infos"]
    }
  });

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ChangeProfileInfos user={res} />
    </Suspense>
  );
}