"use client";

import React, { useState } from "react";

// components
import InputForm from "../components/InputForm";
import PasswordInput from "../components/PasswordInput";

// libs
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ReactLoading from "react-loading";

// schemas
import { UserSchemaLogin } from "@/schemas/User";

// actions
import { Login } from "@/app/actions/_user";
import toast from "react-hot-toast";

type Inputs = z.infer<typeof UserSchemaLogin>

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(UserSchemaLogin)
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await Login(data)
      .then((res) => {
        if (res === undefined) {
          toast.success(`Bem-vindo novamente ${data.identifier}`, {
            style: {
              padding: "12px",
            }
          });
        } else {
          toast.error("Senha ou email inválidos", {
            style: {
              padding: "12px",
            }
          });
        }
      })
      .catch(() => {
        toast.error("Falha na req");
      });
  };

  const [pass, setPass] = useState<string>("");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-y-3 w-full max-w-[450px] lg:min-w-[450px]'>
      <div className="w-full flex flex-col items-center relative gap-y-1">
        <InputForm
          type="text"
          {...register("identifier")}
          placeholder='Email'
        />
        <span className={`${errors.identifier ? "h-[20px]" : "h-0"} ease-linear duration-200 overflow-x-hidden text-xs w-full text-center text-white`}>
          {errors.identifier?.message}
        </span>
      </div>
      <div className="w-full flex flex-col items-center relative gap-y-1">
        <PasswordInput
          {...register("password")}
          placeholder='Senha'
          onChange={(e) => setPass(e.target.value)}
        />
        <span className={`${errors.password ? "h-[20px]" : "h-0"} ease-linear duration-200 overflow-x-hidden text-xs w-full text-center text-white`}>
          {errors.password?.message}
        </span>
      </div>

      <div className="flex items-center justify-between w-full text-xs text-white">
        <div className="flex items-center gap-x-2 px-2">
          <input
            type="checkbox"
            {...register("connected")}
            id='connected'
            className='appearance-none w-[12px] h-[12px] outline-none bg-white focus:border-blue_button checked:bg-blue_button checked:border-2 rounded-[2px]'
          />
          <label htmlFor="connected">Mantenha-me conectado</label>
        </div>
      </div>
      <button
        type='submit'
        className={`w-full h-[50px] bg-blue_button ease-out duration-200 text-white text-center rounded-md p-3 mt-4 flex justify-center items-center hover:bg-opacity-80 focus:outline-none ${pass.length < 6 ? "" : ""}`}
      >
        {isSubmitting ?
          <ReactLoading
            width={40}
            height={40}
            color="#fff"
            type="bars"
          /> :
          "Entrar"
        }
      </button>
    </form>
  );
};

export default LoginForm;