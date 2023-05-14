import { ToastOptions, TypeOptions, toast as toastify } from "react-toastify";

export default function toast(
  message: string,
  type: TypeOptions,
  options?: Omit<ToastOptions, "type" | "message">
) {
  return toastify(message, {
    type,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    ...options,
  });
}
