"use client";

import { z } from "zod";
import PasswordInput from "../components/PasswordInput";
import { UserRedefinePasswordSchema } from "@/schemas/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactLoading from "react-loading";
import { useRouter, useSearchParams } from "next/navigation";
import { ForgotPassword } from "@/app/actions/_user";
import toast from "react-hot-toast";

type TForgotPasswordTypes = z.infer<typeof UserRedefinePasswordSchema>

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TForgotPasswordTypes>({
    resolver: zodResolver(UserRedefinePasswordSchema)
  });

  const searchParams = useSearchParams();
  const { push } = useRouter();

  const token = searchParams.get("token");
  const user_id = searchParams.get("user_id");

  const onSubmit: SubmitHandler<TForgotPasswordTypes> = async (data) => {
    await ForgotPassword({
      password: data.password,
      token: token as string,
      user_id: user_id as string
    })
      .then(() => {
        toast.success("Senha redefinida com sucesso! Faça login para continuar", {
          style: {
            padding: "12px",
          }
        });
        push("/login");
      })
      .catch(() => {
        toast.error("Houve um erro na redefinição da sua senha. Por favor, tente novamente mais tarde.", {
          style: {
            padding: "12px",
          },
        });
      });
  };

  return (
    <form onClick={handleSubmit(onSubmit)} className='w-full max-w-[450px] lg:min-w-[450px] flex flex-col items-center gap-y-2'>
      <div className="w-full flex flex-col items-center relative">
        <PasswordInput
          {...register("password")}
          placeholder='Senha'
        />
        <span className={`${errors.password ? "h-[20px]" : "h-0"} transition-all duration-200 overflow-hidden text-xs w-full text-center text-white mt-1`}>
          {errors.password?.message}
        </span>
      </div>
      <div className="w-full flex flex-col items-center relative">
        <PasswordInput
          {...register("confirmPassword")}
          placeholder='Senha'
        />
        <span className={`${errors.confirmPassword ? "h-[20px]" : "h-0"} transition-all duration-200 overflow-hidden text-xs w-full text-center text-white mt-1`}>
          {errors.confirmPassword?.message}
        </span>
      </div>
      <button
        type='submit'
        className={"w-full h-[50px] bg-blue_button ease-out duration-200 text-white text-center rounded-md p-3 mt-4 flex justify-center items-center hover:bg-opacity-80 focus:outline-none outline-none"}
      >
        {isSubmitting ?
          <ReactLoading
            width={40}
            height={40}
            color="#fff"
            type="bars"
          /> :
          "Enviar nova senha"
        }
      </button>
    </form>
  );
};

export default ForgotPasswordForm;