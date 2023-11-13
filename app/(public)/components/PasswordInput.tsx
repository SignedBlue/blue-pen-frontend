"use client";

import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput: React.FC<PasswordInputProps> = React.forwardRef(
  ({ ...props }, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [pass, setPass] = useState<boolean>(true);

    return (
      <div className='rounded-md w-full relative h-[40px] flex items-center'>
        <input
          className="w-full h-full p-2 rounded-md text-dark_bg outline-none"
          type={pass ? "password" : "text"}
          {...props}
          ref={ref}
        />
        <button
          type="button"
          onClick={() => setPass(prev => !prev)}
          className="absolute right-2 text-xl text-neutral-500 hover:text-neutral-400 ease-out duration-200"
        >
          {pass ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput"; // Adding the displayName

export default PasswordInput;
