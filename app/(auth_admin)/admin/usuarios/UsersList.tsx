"use client";

import Modal from "@/app/components/Modal";
import Navbar from "@/app/components/Navbar";
import { help_users_page } from "@/constants/Helps";
import { formatPhoneNumber } from "@/utils/formatters";
import Link from "next/link";
import React, { useState } from "react";

interface UsersListProps {
  users: TUserData[];
}

const UsersList = ({ users }: UsersListProps) => {
  const [search, setSearch] = useState<string>("");

  const filteredUsers = users.filter((user) => {
    const nameMatches = user.name.toLowerCase().includes(search.toLowerCase());
    const emailMatches = user.email ? user.email.toLowerCase().includes(search.toLowerCase()) : false;
    const phoneMatches = user.phone ? user.phone.toLowerCase().includes(search.toLowerCase()) : false;

    return (user.user_type === null || user.user_type === "client") && (nameMatches || emailMatches || phoneMatches);
  });

  return (
    <div className="flex flex-col gap-y-2 items-start">
      <Navbar title="Clientes">
        <Modal title="Clientes" content={help_users_page} />
        <input
          type="search"
          placeholder="Pesquise por cliente"
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md text-sm outline-none appearance-none bg-transparent hover:bg-white/10 h-[30px] placeholder:text-neutral-400 focus:bg-white/20"
        />
      </Navbar>

      <div className="grid grid-cols-3 2xl:grid-cols-4 gap-5 w-full">
        {filteredUsers.length === 0 ? (
          <p>Nenhum cliente {`"${search}"`} encontrado.</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex flex-col items-start justify-start h-full gap-y-1 w-full min-w-[250px] min-h-[150px] bg-gradient-to-b from-neutral-300/40 to-neutral-500/100 rounded-md p-5 ease-out duration-200"
            >
              <p className="text-xl font-bold mb-2 max-w-full truncate">{user.name}</p>
              <span className="text-sm">{user.email || "-"}</span>
              <span className="text-sm">{formatPhoneNumber(user.phone) || "-"}</span>
              <div className="flex items-center justify-between gap-x-5 w-full pt-4">
                <Link
                  href={`/admin/usuarios/contratos/${user.id}`}
                  className="border p-2 text-sm rounded-md font-semibold bg-white text-neutral-800 hover:bg-white/80 ease-out duration-200"
                >
                  Ver contratos
                </Link>
                <Link
                  href={`/admin/usuarios/infos/${user.id}`}
                  className="border p-2 text-sm rounded-md font-semibold hover:bg-black/20"
                >
                  Ver dados
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default UsersList;