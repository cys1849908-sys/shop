"use client";

import PillButton from "../common/buttons/PillButton";

interface Category {
  id: string;
  label: string;
}

interface FeaturedFilterTabsProps {
  CATEGORIES: Category[];
  activeTab: string;
  onTabChange: (id: string) => void;
}
export default function FeaturedFilterTabs({
  CATEGORIES,
  activeTab,
  onTabChange,
}: FeaturedFilterTabsProps) {
  return (
    <div className="w-full py-4">
      <div className="flex gap-1 ovflow-x-auto scrollbar-hide">
        {CATEGORIES.map((category) => (
          <PillButton
            key={category.id}
            label={category.label}
            isActive={activeTab === category.id}
            onClick={() => onTabChange(category.id)}
          />
        ))}
      </div>
    </div>
  );
}
