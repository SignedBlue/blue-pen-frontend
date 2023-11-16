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
                group inline-flex items-center rounded-md bg-blue_button px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
          >
            <span>{userName}</span>
            <FaChevronDown
              className={`
                  ${open ? "text-neutral-300" : "text-neutral-300/70"}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-neutral-300/80`}
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