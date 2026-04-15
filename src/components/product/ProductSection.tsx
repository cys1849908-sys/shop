import ProductCarousel from "./ProductCarousel";
import CategoryNav from "../category/CategoryNav";
import { getProducts } from "@/src/lib/data/products";
import { Categories } from "@/src/types/category";
import SectionHeader from "../SectionHeader";

interface ProductCollectionProps {
  category?: string;
  title: string;
  subtitle: string;
  type: "best-item-category" | "new-item-category" | "featured-category";
}

export default async function ProductSection({
  category = "All",
  title,
  subtitle,
  type,
}: ProductCollectionProps) {
  const products = await getProducts(type, category);

  return (
    <section className="inner mb-10">
      <div className="mb-10">
        <div className="flex items-end justify-between mb-7">
          <SectionHeader title={title} subtitle={subtitle} />
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
        <CategoryNav
          activeTab={category}
          categories={Categories}
          queryKey={type}
        />
      </div>

      <ProductCarousel
        products={products}
        itemsPerView={5}
        scrollbar={products.length > 5}
      />
    </section>
  );
}
