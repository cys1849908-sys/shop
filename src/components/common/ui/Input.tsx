import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  isPassword?: boolean;
  tel?: boolean;
}

export default function Input({
  error,
  isPassword = false,
  tel = true,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isTelType = props.type === "tel"; // 아 이건 나중에 하는걸로
  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={clsx(
          "flex items-center border focus-within:border-gray-500 placeholder:text-gray-400",
          error ? "border-red-500" : "border-gray-200",
        )}
      >
        <input
          className="border-none focus:outline-none w-full bg-white px-4 py-2 text-[12px] text-gray-900 "
          {...props}
          onChange={(e) => {
            if (isTelType) {
              console.log("?");
            }
            props.onChange?.(e);
          }}
          type={isPassword ? (showPassword ? "text" : "password") : props.type}
        />
        {isPassword &&
          (showPassword ? (
            <button
              type="button"
              className="px-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Eye className="w-4 h-4 stroke-[0.5]" />
            </button>
          ) : (
            <button
              type="button"
              className="px-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <EyeOff className="w-4 h-4 stroke-[0.5]" />
            </button>
          ))}
      </div>
    </div>
  );
}
