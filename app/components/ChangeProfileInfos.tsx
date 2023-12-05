"use client";

import InputForm from "@/app/(public)/components/InputForm";
import { UpdateUserInfos } from "@/app/actions/_user";
import Modal from "@/app/components/Modal";
import Navbar from "@/app/components/Navbar";
import { help_edicao_perfil } from "@/constants/Helps";
import { UserSchemaUpdateInfos } from "@/schemas/User";
import { reformatPhoneNumber } from "@/utils/formatters";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactInputMask from "react-input-mask";
import ReactLoading from "react-loading";
import { z } from "zod";

interface IChangeProfileInfosProps {
  user: TUserData;
}

type Inputs = z.infer<typeof UserSchemaUpdateInfos>

const ChangeProfileInfos = ({ user }: IChangeProfileInfosProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(UserSchemaUpdateInfos),
    defaultValues: {
      name: user.name || "",
      phone: reformatPhoneNumber(user.phone),
      address: user.address.street || "",
      addressNumber: user.address.number || "",
      complement: user.address.complement || "",
      postalCode: user.address.postal_code || "",
      city: user.address.city || "",
    }
  });

  const onSubmitt: SubmitHandler<Inputs> = async (data) => {
    await UpdateUserInfos(data)
      .then(() => {
        toast.success(`Usuário atualizado com sucesso, ${data.name}!`, {
          style: {
            padding: "12px",
          }
        });
      })
      .catch(() => {
        toast.error("Falha ao atualizar usuário. Por favor verifique os dados e tente novamente.", {
          style: {
            padding: "12px",
          },
        });
      });
  };

  return (
    <>
      <Navbar title="Editar perfil">
        <Modal title="Editar perfil" content={help_edicao_perfil} />
      </Navbar>

      <form onSubmit={handleSubmit(onSubmitt)} className="flex flex-col gap-y-5 items-start w-[60%]">
        <div className="w-full flex items-center justify-between gap-x-7">
          <div className="w-full flex flex-col items-start gap-y-1">
            <label htmlFor="name">Nome:</label>
            <InputForm
              type="text"
              id="name"
              {...register("name")}
            />
          </div>
          <div className="w-[80%] flex flex-col items-start gap-y-1">
            <label htmlFor="email">Email:</label>
            <InputForm
              type="text"
              defaultValue={user.email}
              readOnly
              className="_input bg-neutral-200 pointer-events-none"
            />
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-y-1">
          <label htmlFor="phone">Telefone:</label>
          <ReactInputMask
            mask="(99) 99999-9999"
            maskChar={null}
            type="tel"
            id="phone"
            {...register("phone")}
            className="_input"
          />
        </div>

        <div className="w-full flex flex-col items-start gap-y-1">
          <label htmlFor="address">Endereço:</label>
          <InputForm
            type="text"
            id="address"
            {...register("address")}
          />
        </div>

        <div className="w-full flex items-center justify-between gap-x-7">
          <div className="w-[80%] flex flex-col items-start gap-y-1">
            <label htmlFor="number">Número:</label>
            <InputForm
              type="text"
              id="number"
              {...register("addressNumber")}
            />
          </div>
          <div className="w-full flex flex-col items-start gap-y-1">
            <label htmlFor="complemento">Complemento:</label>
            <InputForm
              type="text"
              id="complemento"
              {...register("complement")}
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-between gap-x-7">
          <div className="w-full flex flex-col items-start gap-y-1">
            <label htmlFor="name">Cidade:</label>
            <InputForm
              type="text"
              id="name"
              {...register("city")}
            />
          </div>
          <div className="w-full flex flex-col items-start gap-y-1">
            <label htmlFor="cep">CEP:</label>
            <InputForm
              type="text"
              id="cep"
              {...register("postalCode")}
            />
          </div>
        </div>

        {/* <div className="w-full flex flex-col items-start gap-y-1">
          <label htmlFor="newpass">Senha:</label>
          <div className="w-full flex flex-col items-center relative">
            <PasswordInput
              {...register("password")}
              placeholder="Senha"
            />
            <span className={`${errors.password ? "h-[30px]" : "h-0"} transition-all duration-200 overflow-hidden text-neutral-50 text-xs text-center mt-1`}>
              {errors.password?.message}
            </span>
          </div>
        </div> */}

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
            "Salvar"
          }
        </button>
      </form>
    </>
  );
};

export default ChangeProfileInfos;