import toast from "react-hot-toast";

interface ToastProps {
  message: string;
}

export const SuccessToast = ({ message }: ToastProps) => {
  return toast.success(`${message}`, {
    style: {
      padding: "12px",
    },
  });
};

export const ErrorToast = ({ message }: ToastProps) => {
  return toast.error(`${message}`, {
    style: {
      padding: "12px",
    },
  });
};
