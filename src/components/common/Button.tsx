import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes} from "react"


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "chip";
}


export default function Button({
  variant = "primary",
  className,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "cursor-pointer py-2 px-3 text-sm font-medium rounded-[10px] items-center",
        classes[variant],
        className,
      )}
      {...props}
    />
  );
}


const classes: Record<NonNullable<Props["variant"]>, string> = {
  primary: "bg-main border-main text-white",
  secondary: "border border-main bg-white text-main",
  chip: "rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
};