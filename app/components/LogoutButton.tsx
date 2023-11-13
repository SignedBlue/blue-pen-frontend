"use client";

import { Logout } from "@/app/actions/_user";
import React from "react";


const LogoutButton = () => {
  return (
    <button
      onClick={() => Logout()}
      className="bg-blue_button text-white border-2 border-blue_button py-1 px-3 rounded-md hover:bg-transparent hover:border-white ease-linear duration-200 font-medium"
    >
      Logout
    </button>
  );
};

export default LogoutButton;