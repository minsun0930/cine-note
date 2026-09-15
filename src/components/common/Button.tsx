import type { ButtonHTMLAttributes} from "react"
import { cn } from '../../lib/utils';

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
        "py-2 px-3 text-sm font-medium rounded-[10px]",
        classes[variant],
        className,
      )}
      {...props}
    />
  );
}


const classes: Record<NonNullable<Props["variant"]>, string> = {
  primary: "bg-main border-main text-white",
  secondary: "border-main bg-white text-main",
  chip: "rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
};