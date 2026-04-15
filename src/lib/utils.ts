import { clsx, type ClassValue } from "clsx";
import { SizeClass } from "../types/ui";
import { twMerge } from "tailwind-merge";

export function cls(...classnames: (string | boolean | undefined)[]) {
  return classnames.filter(Boolean).join(" ");
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createUniqueKey = (productId: string, size: string) =>
  `${productId}-${size}`;

export const calculateDiscount = (price: number, discountRate = 0) => {
  if (!discountRate) {
    return { discountPercent: 0, hasDiscount: false, finalPrice: price };
  }
  const discountPercent = Math.round(discountRate * 100);
  const hasDiscount = discountPercent > 0;
  const finalPrice = price * (1 - discountRate);

  return {
    discountPercent,
    hasDiscount,
    finalPrice: Math.floor(finalPrice),
  };
};

export const getResponsiveWidth = ({
  itemCount,
  gapPx = 4,
}: {
  itemCount: number;
  gapPx?: number;
}) => {
  const totalGap = gapPx * (itemCount - 1);
  return `calc((100% - ${totalGap}px) / ${itemCount})`;
};
