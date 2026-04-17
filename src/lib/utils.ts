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
