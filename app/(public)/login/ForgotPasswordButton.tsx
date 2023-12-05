import { ForgotPassword } from "@/app/actions/_user";
import React from "react";

interface IForgotPasswordButtonProps {
  email: string;
}

const ForgotPasswordButton = ({ email }: IForgotPasswordButtonProps) => {

  return (
    <button
      type="button"
      onClick={() => ForgotPassword(email)}
      className="hover:text-neutral-300"
    >
      Esqueceu a senha?
    </button>
  );
};

export default ForgotPasswordButton;