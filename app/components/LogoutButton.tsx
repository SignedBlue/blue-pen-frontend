"use client";

import { Logout } from "@/app/actions/_user";

const LogoutButton = () => {
  return (
    <button
      onClick={() => Logout()}
      className="bg-blue_button text-white border-2 border-blue_button py-1 px-3 rounded-md hover:bg-transparent hover:border-white ease-linear duration-200 font-medium w-full max-w-[200px]"
    >
      Logout
    </button>
  );
};

export default LogoutButton;