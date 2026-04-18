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
export const calculateDisplayPrice = (price: number, discount?: number) => {
  if (!discount || discount <= 0) return price;
  return Math.round(price * (1 - discount / 100));
};

export const maskUserName = (name: string): string => {
  return name.slice(0, 1) + "****";
};
