import React from "react";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const InputForm = React.forwardRef<HTMLInputElement, InputFormProps>((props, ref) => {
  return (
    <input
      className='rounded-md p-2 w-full text-dark_bg outline-none h-[40px]'
      {...props}
      ref={ref}
    />
  );
});

InputForm.displayName = "InputForm"; // Adding the displayName

export default InputForm;
