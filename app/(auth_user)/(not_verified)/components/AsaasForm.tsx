"use client";

import InputForm from "@/app/(public)/components/InputForm";
import { SendAsaasData } from "@/app/actions/_asaas";
import { AsaasSchema } from "@/schemas/Asaas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import ReactInputMask from "react-input-mask";
import ReactLoading from "react-loading";
import { z } from "zod";

type Inputs = z.infer<typeof AsaasSchema>

const AsaasForm = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    },
  } = useForm<Inputs>({
    resolver: zodResolver(AsaasSchema)
  });

  const { push } = useRouter();

  const onSubmitt: SubmitHandler<Inputs> = async (data) => {
    const res = await SendAsaasData(data);

    if (res?.statusCode === 401) {
      toast.error("Dados inválidos, contate o suporte",
        { style: { padding: "12px" } });
    } else if (res?.statusCode === 400) {
      toast.error("Ocorreu um erro ao processar a requisição",
        { style: { padding: "12px" } });
    } else {
      toast.success("Informações enviadas com sucesso. Prosseguindo para a Etapa 2.",
        { style: { padding: "12px" } });
      push("/verificacao/etapa-2");
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmitt)} className='flex flex-col items-center gap-y-3 w-[90%]'>
      <div className="flex items-start justify-between gap-x-4 w-full">
        <div className="w-[40%] flex flex-col items-center relative gap-y-1">
          <ReactInputMask
            mask="999.999.999-99"
            maskChar={null}
            type="text"
            {...register("cpfCnpj")}
            placeholder='CPF'
            className="rounded-md p-2 w-full text-dark_bg outline-none h-[40px]"
          />
          <span className={`${errors.cpfCnpj ? "h-[20px]" : "h-0"} ease-out duration-200 overflow-x-hidden text-xs max-w-[320px] text-center`}>
            {errors.cpfCnpj?.message}
          </span>
        </div>
        <div className="w-full flex flex-col items-center relative gap-y-1">
          <div className="w-full flex items-center gap-x-2">
            <label htmlFor="birthdate" className="text-sm whitespace-nowrap">Data de nascimento:</label>
            <InputForm
              id="birthdate"
              type="date"
              {...register("birthDate")}
              placeholder='birthDate'
            />
          </div>
          <span className={`${errors.birthDate ? "h-[20px]" : "h-0"} ease-out duration-200 overflow-x-hidden text-xs max-w-[320px] text-center`}>
            {errors.birthDate?.message}
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-x-4 w-full">
        <div className="w-full flex flex-col items-center relative gap-y-1">
          <ReactInputMask
            mask="(99) 99999-9999"
            maskChar={null}
            type="tel"
            {...register("mobilePhone")}
            placeholder='Celular'
            className="rounded-md p-2 w-full text-dark_bg outline-none h-[40px]"
          />
          <span className={`${errors.mobilePhone ? "h-[20px]" : "h-0"} ease-out duration-200 overflow-x-hidden text-xs max-w-[320px] text-center`}>
            {errors.mobilePhone?.message}
          </span>
        </div>
        <div className="w-full flex flex-col items-center relative gap-y-1">
          <ReactInputMask
            mask="(99) 99999-9999"
            maskChar={null}
            {...register("phone")}
            placeholder='Telefone'
            className="rounded-md p-2 w-full text-dark_bg outline-none h-[40px]"
          />
          <span className={`${errors.phone ? "h-[20px]" : "h-0"} ease-out duration-200 overflow-x-hidden text-xs max-w-[320px] text-center`}>
            {errors.phone?.message}
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-x-4 w-full">
        <div className="w-full flex flex-col items-center relative gap-y-1">
          <InputForm
            type="text"
            {...register("address")}
            placeholder='Endereço'
          />
          <span className={`${errors.address ? "h-[20px]" : "h-0"} ease-out duration-200 overflow-x-hidden text-xs max-w-[320px] text-center`}>
            {errors.address?.message}
          </span>
        </div>
        <div className="w-full flex flex-col items-center relative gap-y-1">
          <InputForm
            type="text"
            {...register("addressNumber")}
            placeholder='Número'
          />
          <span className={`${errors.addressNumber ? "h-[20px]" : "h-0"} ease-out duration-200 overflow-x-hidden text-xs max-w-[320px] text-center`}>
            {errors.addressNumber?.message}
          </span>
        </div>
        <div className="w-full flex flex-col items-center relative gap-y-1">
          <InputForm
            type="text"
            {...register("complement")}
            placeholder='Complemento'
          />
          <span className={`${errors.complement ? "h-[20px]" : "h-0"} ease-out duration-200 overflow-x-hidden text-xs max-w-[320px] text-center`}>
            {errors.complement?.message}
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-x-4 w-full">
        <div className="w-full flex flex-col items-center relative gap-y-1">
          <InputForm
            type="text"
            {...register("province")}
            placeholder='Cidade'
          />
          <span className={`${errors.province ? "h-[20px]" : "h-0"} ease-out duration-200 overflow-x-hidden text-xs max-w-[320px] text-center`}>
            {errors.province?.message}
          </span>
        </div>

        <div className="w-full flex flex-col items-center relative gap-y-1">
          <ReactInputMask
            mask="99999-999"
            maskChar={null}
            type="text"
            {...register("postalCode")}
            placeholder='CEP'
            className="rounded-md p-2 w-full text-dark_bg outline-none h-[40px]"
          />
          <span className={`${errors.postalCode ? "h-[20px]" : "h-0"} ease-out duration-200 overflow-x-hidden text-xs max-w-[320px] text-center`}>
            {errors.postalCode?.message}
          </span>
        </div>
      </div>

      <button
        type='submit'
        className={"w-full h-[50px] bg-blue_button ease-out duration-200 text-white text-center rounded-md p-3 mt-4 flex justify-center items-center hover:bg-opacity-80 focus:outline-none"}
      >
        {isSubmitting ?
          <ReactLoading
            width={40}
            height={40}
            color="#fff"
            type="bars"
          /> :
          "Enviar"
        }
      </button>
    </form>
  );
};

export default AsaasForm;