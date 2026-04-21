export function cls(...classnames: (string | boolean | undefined)[]) {
  return classnames.filter(Boolean).join(" "); // clsx사용중
}

export const createUniqueKey = (productId: string, size: string) =>
  `${productId}-${size}`;

export const maskUserName = (name: string): string => {
  return name.slice(0, 1) + "****";
};

export const formatCurrency = (unitPrice: number, currency = "원"): string => {
  return `${unitPrice.toLocaleString()}${currency}`;
};

export const calculateDisplayPrice = (
  unitPrice: number,
  discountRate?: number,
) => {
  if (!discountRate || discountRate <= 0) return unitPrice;
  return Math.round(unitPrice * (1 - discountRate / 100));
};

export const getFormattedDate = (monthsAgo: number = 0) => {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
