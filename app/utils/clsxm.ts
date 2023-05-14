import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export default function clsxm(...classes: Parameters<typeof clsx>) {
  return twMerge(clsx(...classes));
}
