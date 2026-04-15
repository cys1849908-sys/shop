"use client";

import Link from "next/link";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

interface CategoryNavProps {
  activeTab: string;
  categories: { id: string; label: string; path?: string }[];
  queryKey: "new-item-category" | "best-item-category" | "featured-category";
}

export default function CategoryNav({
  activeTab,
  categories,
  queryKey,
}: CategoryNavProps) {
  const searchParams = useSearchParams();

  const createQueryPath = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "All") {
      params.delete(queryKey);
    } else {
      params.set(queryKey, value);
    }

    return `?${params.toString()}`;
  };

  return (
    <nav className="flex gap-4">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={createQueryPath(cat.id)}
          scroll={false}
          className={clsx(
            "text-[13px] transition-colors",
            activeTab === cat.id
              ? "text-black font-bold"
              : "text-gray-400 hover:text-gray-600",
          )}
        >
          {cat.label}
        </Link>
      ))}
    </nav>
  );
}
