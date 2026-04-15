import React, { ReactElement } from "react";

interface FormRowVerticalProps {
  label?: string;
  error?: string;
  children: ReactElement;
}

export default function FormRowVertical({
  label,
  error,
  children,
}: FormRowVerticalProps) {
  const childId = React.isValidElement(children)
    ? (children.props as { id?: string }).id
    : undefined;

  return (
    <div className="flex flex-col gap-[0.8rem] py-[7px] w-full">
      {label && (
        <label htmlFor={childId} className="text-xs">
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className="text-[10px] text-[var(--color-red-700)]">{error}</span>
      )}
    </div>
  );
}
