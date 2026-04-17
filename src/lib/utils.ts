export function cls(...classnames: (string | boolean | undefined)[]) {
  return classnames.filter(Boolean).join(" "); // clsx사용중
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

export const formatCurrency = (price: number, currency = "원"): string => {
  return `${price.toLocaleString()}${currency}`;
};

export const formatPrice = (
  price: number,
  discountRate?: number,
  currency = "원",
): { finalPrice: string; originalPrice: string; discountPercent: number } => {
  const { discountPercent, finalPrice } = calculateDiscount(
    price,
    discountRate,
  );
  return {
    finalPrice: formatCurrency(finalPrice, currency),
    originalPrice: formatCurrency(price, currency),
    discountPercent,
  };
};

export const maskUserName = (name: string): string => {
  return name.slice(0, 1) + "****";
};

export const formatDiscount = (discountRate: number | undefined): number => {
  if (!discountRate) return 0;
  return Math.round(discountRate * 100);
};
