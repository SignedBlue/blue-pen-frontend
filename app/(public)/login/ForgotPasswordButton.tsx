"use client";

import React, { Fragment, useState } from "react";

import InputForm from "../components/InputForm";

import { MdEmail } from "react-icons/md";

import { UserForgotPasswordSchema } from "@/schemas/User";

// components
import toast from "react-hot-toast";
import ReactLoading from "react-loading";
import { Transition, Dialog } from "@headlessui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler as ForgotSubmitHandler, useForm as ForgotUseForm } from "react-hook-form";
import { ForgotPasswordRequestToken } from "@/app/actions/_user";

type TForgotTypes = z.infer<typeof UserForgotPasswordSchema>

const ForgotPasswordButton = () => {
  const {
    register: forgot_register,
    handleSubmit: forgot_handleSubmit,
    formState: {
      errors: forgot_errors,
      isSubmitting: forgot_isSubmitting
    }
  } = ForgotUseForm<TForgotTypes>({
    resolver: zodResolver(UserForgotPasswordSchema)
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onSubmittt: ForgotSubmitHandler<TForgotTypes> = async (data) => {
    await ForgotPasswordRequestToken(data)
      .then(() => {
        toast.success("Token para redefinição de senha gerado com sucesso! Por favor verifique seu email.", {
          style: {
            padding: "12px",
          },
        });
        setIsOpen(false);
      })
      .catch(() => {
        toast.error("Houve um erro na requisição. Por favor, tente novamente mais tarde.", {
          style: {
            padding: "12px",
          },
        });
      });
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="hover:text-opacity-80"
      >
        Esqueceu a senha?
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[500px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="w-full flex items-center justify-between mb-4">
                    <Dialog.Title
                      as="h3"
                      className="text-dark_bg text-2xl _title mb-0 font-bold"
                    >
                      Redefinição de senha
                    </Dialog.Title>
                  </div>

                  <div className="w-full flex flex-col items-start gap-y-7">
                    <p className="">
                      Por favor, preencha o campo com o seu endereço de e-mail. Você receberá um <b>código de verificação</b> nesse e-mail para continuar.
                    </p>

                    <form onSubmit={forgot_handleSubmit(onSubmittt)} className="w-full flex flex-col items-start gap-y-7">
                      <div className="w-full flex flex-col items-center relative">
                        <InputForm
                          type="email"
                          {...forgot_register("identifier")}
                          placeholder='Email'
                          className="_input bg-neutral-100"
                        />
                        <span className={`${forgot_errors.identifier ? "h-[20px]" : "h-0"} transition-all duration-200 overflow-hidden text-xs w-full text-center text-neutral-800 mt-1`}>
                          {forgot_errors.identifier?.message}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-x-5 w-full pt-4">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="py-2 px-4 text-sm rounded-[8px] font-semibold border border-neutral-800 text-neutral-800 hover:bg-neutral-200 ease-out duration-200"
                        >
                          Voltar
                        </button>
                        <button
                          type="submit"
                          disabled={forgot_isSubmitting}
                          className="flex items-center justify-center gap-x-4 h-[40px] w-[180px] text-sm rounded-[8px] font-semibold bg-neutral-800 text-white hover:bg-neutral-700 ease-out duration-200"
                        >
                          {forgot_isSubmitting ? <ReactLoading
                            width={40}
                            height={40}
                            color="#fff"
                            type="cylon"
                          /> :
                            (
                              <>
                                <span>Enviar email</span>
                                <i className="text-xl">
                                  <MdEmail />
                                </i>
                              </>
                            )
                          }

                        </button>
                      </div>
                    </form>

                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ForgotPasswordButton;