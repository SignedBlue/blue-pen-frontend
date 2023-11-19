"use client";

import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaChevronDown } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

interface UserAccountProps {
  userName: string;
}

const UserAccount = ({ userName }: UserAccountProps) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "text-white" : "text-white/90"}
                group inline-flex items-center gap-x-2 rounded-lg bg-neutral-400 px-3 py-2 text-base font-medium hover:text-white focus:outline-none outline-none hover:bg-neutral-400/90`}
          >
            <span className="w-[30px] h-[30px] flex items-center text-sm uppercase justify-center bg-white rounded-full text-dark_bg font-bold">{userName.slice(0, 1)}</span>
            <span>{userName}</span>
            <FaChevronDown
              className={`
              ${open ? "rotate-180" : ""}
              h-3 w-3 transition duration-150 ease-in-out`}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 mt-3 !z-[200] transform px-4 bg-neutral-100 text-neutral-500 font-medium rounded-xl flex flex-col items-center p-4 gap-y-3 w-[200px]">
              <Link href={"/#"}>Meus dados</Link>
              <LogoutButton />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default UserAccount;