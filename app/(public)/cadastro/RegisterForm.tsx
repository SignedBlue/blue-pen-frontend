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
import { useRouter } from "next/navigation";

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

  const { push } = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await CreateUser(data)
      .then((res) => {
        if (res?.statusCode === 409 || res?.payload.error === "Conflict") {
          toast.error("Este email já está em uso. Por favor, use outro email ou faça login.", {
            style: {
              padding: "12px",
            }
          });
        } else {
          toast.success("Sua conta foi criada com sucesso! Faça login para começar a usar o BluePen.", {
            style: {
              padding: "12px",
            }
          });
          push("/login");
        }
      })
      .catch(() => {
        toast.error("Desculpe, houve um problema ao criar sua conta. Por favor, tente novamente mais tarde.", {
          style: {
            padding: "12px",
          }
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"w-full max-w-[450px] flex flex-col items-center gap-y-2"}>
      <div className="w-full flex flex-col items-center relative">
        <InputForm
          type="text"
          {...register("username")}
          placeholder="Nome"
        />
        <span className={`${errors.username ? "h-[20px]" : "h-0"} transition-all duration-200 overflow-hidden text-neutral-50 text-xs text-center mt-1`}>
          {errors.username?.message}
        </span>
      </div>
      <div className="w-full flex flex-col items-center relative">
        <InputForm
          type="email"
          {...register("email")}
          placeholder="Email"
        />
        <span className={`${errors.email ? "h-[20px]" : "h-0"} transition-all duration-200 overflow-hidden text-neutral-50 text-xs text-center mt-1`}>
          {errors.email?.message}
        </span>
      </div>
      <div className="w-full flex flex-col items-center relative">
        <PasswordInput
          {...register("password")}
          placeholder="Senha"
        />
        <span className={`${errors.password ? "h-[30px]" : "h-0"} transition-all duration-200 overflow-hidden text-neutral-50 text-xs text-center mt-1`}>
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