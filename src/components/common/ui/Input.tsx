import { cn } from "@/src/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export default function Input({
  label,
  className,
  error,
  required = false,
  ...props
}: InputProps) {
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
      <input
        className={cn(
          "border border-gray-200 rounded-[4px] bg-white px-4 py-2 text-[12px] text-gray-900",
          "focus:border-gray-400 focus:outline-none transition-colors",
          "placeholder:text-gray-400",
          className,
        )}
        {...props}
      />
      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </div>
  );
}
