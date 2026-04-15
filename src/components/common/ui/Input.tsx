import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  required?: boolean;
  isPassword?: boolean;
}

export default function Input({
  label,
  className = "",
  error,
  required = false,
  isPassword = false,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <div className="flex items-center">
          <label className="text-sm text-black">{label}</label>
          {required && (
            <span className="w-[3px] h-[4px] rounded-sm bg-red-500 mr-1 mb-2" />
          )}
        </div>
      )}
      <div
        className={clsx(
          "flex items-center border focus-within:border-gray-500 placeholder:text-gray-400",
          error ? "border-red-500" : "border-gray-200",
        )}
      >
        <input
          className={`border-none focus:outline-none w-full bg-white px-4 py-2 text-[12px] text-gray-900 ${className}`}
          {...props}
          type={showPassword ? "text" : "password"}
        />
        {isPassword &&
          (showPassword ? (
            <button
              type="button"
              className="px-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <EyeOff className="w-4 h-4 stroke-[0.5]" />
            </button>
          ) : (
            <button
              type="button"
              className="px-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Eye className="w-4 h-4 stroke-[0.5]" />
            </button>
          ))}
      </div>
    </div>
  );
}
