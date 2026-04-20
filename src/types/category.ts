export type CategorySlug =
  | "all"
  | "tops"
  | "pants"
  | "outerwear"
  | "accessories"
  | "shoes";

export type Category = {
  id: string;
  name: string;
  slug: CategorySlug;
  description?: string;
  level: number;
  parentId?: string | null;
  path: string;
};

export const Categories = [
  { id: "All", label: "ALL" },
  { id: "WOMEN", label: "WOMEN" },
  { id: "MEN", label: "MEN" },
  { id: "CAP", label: "CAP" },
  { id: "SHOES", label: "SHOES" },
  { id: "BAG_ACC", label: "BAG&ACC" },
];
