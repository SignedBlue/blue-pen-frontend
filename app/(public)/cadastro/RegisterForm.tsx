"use client";

// actions
import { CreateUser } from "@/app/actions/_user";

// schemas
import { UserSchemaRegister } from "@/schemas/User";

// components
import InputForm from "../components/InputForm";
import PasswordInput from "../components/PasswordInput";

// external libs
import ReactLoading from "react-loading";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type Inputs = z.infer<typeof UserSchemaRegister>

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<Inputs>({
    resolver: zodResolver(UserSchemaRegister)
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await CreateUser(data)
      .then(() => {
        toast.success("Conta criada com sucesso, por favor faca login para continuar", {
          style: {
            padding: "12px",
          }
        });
      })
      .catch(() => {
        toast.error("Erro ao criar conta BluePen..", {
          style: {
            padding: "12px",
          }
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col items-center w-full max-w-[450px] ${errors.username || errors.email || errors.password ? "gap-y-1" : "gap-y-2"}`}>
      <div className="w-full flex flex-col items-center relative gap-y-1">
        <InputForm
          type="text"
          {...register("username")}
          placeholder="Nome"
        />
        <span className={`${errors.username ? "h-[20px]" : "h-0"} ease-out duration-200 overflow-x-hidden text-neutral-50 text-xs max-w-[320px] text-center`}>
          {errors.username?.message}
        </span>
      </div>
      <div className="w-full flex flex-col items-center relative gap-y-1">
        <InputForm
          type="email"
          {...register("email")}
          placeholder="Email"
        />
        <span className={`${errors.email ? "h-[20px]" : "h-0"} ease-out duration-200 overflow-x-hidden text-neutral-50 text-xs max-w-[320px] text-center`}>
          {errors.email?.message}
        </span>
      </div>
      <div className="w-full flex flex-col items-center relative gap-y-1">
        <PasswordInput
          {...register("password")}
          placeholder="Senha"
        />
        <span className={`${errors.password ? "h-[30px]" : "h-0"} ease-out duration-200 overflow-x-hidden text-neutral-50 text-xs max-w-[320px] text-center`}>
          {errors.password?.message}
        </span>
      </div>
      <button
        type="submit"
        className="w-full h-[50px] bg-blue_button ease-out duration-200 text-white text-center rounded-md p-3 mt-4 flex justify-center items-center hover:bg-opacity-80"
      >
        {isSubmitting ? <ReactLoading
          width={40}
          height={40}
          color="#fff"
          type="bars"
        /> :
          "Criar conta"}
      </button>
    </form>
  );
};

export default RegisterForm;