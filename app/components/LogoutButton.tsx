"use client";

import { Logout } from "@/app/actions/_user";
import { MdLogout } from "react-icons/md";

const LogoutButton = () => {
  return (
    <button
      onClick={() => Logout()}
      className="w-full max-w-[200px] flex items-center justify-center gap-x-2 font-medium bg-blue_button text-white py-1 px-3 rounded-md hover:bg-blue_button/90 group"

    >
      <span>Logout</span>
      <i className="group-hover:translate-x-1 ease-out duration-200"><MdLogout /></i>
    </button>
  );
};

export default LogoutButton;