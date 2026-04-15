"use client";

import Image from "next/image";
import FeaturedFilterTabs from "./FeaturedFilterTabs";
import Carousel from "../Carousel";
import { Product } from "@/src/types/product";
import ProductCard from "../product/ProductCard";
import ProductCarousel from "../product/ProductCarousel";
import { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader";

type TabType = "CAP" | "APPAREL" | "SHOES" | "BAG";

const PRODUCTS_MAP: Record<TabType, Product[]> = {
  CAP: [],
  APPAREL: [],
  SHOES: [],
  BAG: [],
};
const CATEGORIES = [
  { id: "CAP", label: "KARINA CAP/BEANIE" },
  { id: "APPAREL", label: "KARINA APPAREL" },
  { id: "SHOES", label: "KARINA SHOES" },
  { id: "BAG", label: "KARINA BAG/ACC" },
];

const BANNERS = [
  { id: "CAP", src: "/images/2023062215005684112_1.jpg", alt: "카리나 화보 1" },
  {
    id: "APPAREL",
    src: "/images/21ceb5993e7833596912b29fa9ab4616.jpg",
    alt: "카리나 화보 2",
  },
  {
    id: "SHOES",
    src: "/images/2023062215005684112_1.jpg",
    alt: "카리나 화보 1",
  },
  {
    id: "BAG",
    src: "/images/21ceb5993e7833596912b29fa9ab4616.jpg",
    alt: "카리나 화보 2",
  },
];
export default function FeaturedSection() {
  const [activeTab, setActiveTab] = useState<TabType>("CAP");
  const activeIndex = BANNERS.findIndex((b) => b.id === activeTab);
  const activeProducts = PRODUCTS_MAP[activeTab];

  return (
    <section>
      <div className="inner mb-20">
        <div className="flex items-end justify-between mb-7">
          <SectionHeader title="Best Item" subtitle="사용자리뷰" />
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
              ‹
            </button>
            <span className="text-sm text-gray-500">1 / 3</span>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
              ›
            </button>
          </div>
        </div>
        <FeaturedFilterTabs
          CATEGORIES={CATEGORIES}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as TabType)}
        />
        <div className="relative flex gap-6">
          <div className="relative w-100  aspect-square">
            <Carousel
              loop
              externalIndex={activeIndex >= 0 ? activeIndex : 0}
              onIndexChange={(index) => {
                const banner = BANNERS[index];
                setActiveTab(banner.id as TabType);
              }}
            >
              {BANNERS.map((item) => (
                <div
                  key={item.id}
                  className="relative w-full h-full cursor-pointer"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </Carousel>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white/50 py-1 px-2">
              {activeIndex + 1} / {BANNERS.length}
            </div>
          </div>
          <div className="flex-1">
            <ProductCarousel
              products={activeProducts}
              itemsPerView={3}
              loop
              scrollbar
            />
          </div>
        </div>
      </div>
    </section>
  );
}
