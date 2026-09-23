import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface FromInputProps {
  placeholder?: string;
  error?: string;
  registration?: UseFormRegisterReturn;
  type?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FromInputProps>(
  ({ placeholder, error, registration, type = "text", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordType = type === "password";
    const inputType = isPasswordType
      ? showPassword
        ? "text"
        : "password"
      : type;
    return (
      <div className="flex relative">
        <div className="relative flex items-center w-full">
          <input
            ref={ref}
            {...registration}
            {...props}
            type={inputType}
            placeholder={placeholder}
            className={`max-w-87 w-full p-4 rounded-[10px] text-sm  max-h-14 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-main 
             ${error ? "focus:ring-red-500 border border-red-500" : "focus:ring-indigo-500"}
             ${isPasswordType ? "pr-10" : ""}`}
          />

          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {error && <span className="text-red-500">{error}</span>}
      </div>
    );
  },
);
FormInput.displayName = "FormInput";
