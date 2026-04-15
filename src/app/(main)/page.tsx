import HeroBannerSection from "@/src/components/banner/HeroBannerSection ";
import PromotionSection from "@/src/components/banner/PromotionBanner";
import FeaturedSection from "@/src/components/featured/FeaturedContainer";
import ProductSection from "@/src/components/product/ProductSection";
import BestReviewSection from "@/src/components/review/BestReviewSection";

export default async function MainPage({
  searchParams,
}: {
  searchParams: Promise<{
    "best-item-category"?: string;
    "featured-category"?: string;
    "new-item-category"?: string;
  }>;
}) {
  const params = await searchParams;

  const activeBest = params["best-item-category"] || "All";
  const activeFeatured = params["featured-category"] || "All";
  const activeNew = params["new-item-category"] || "All";

  return (
    <div>
      <HeroBannerSection />
      <FeaturedSection />
      <ProductSection
        type="best-item-category"
        category={activeBest}
        title="인기상품"
        subtitle="아닐지도"
      />
      <ProductSection
        type="new-item-category"
        category={activeNew}
        title="신상품"
        subtitle="아닐지도"
      />

      <PromotionSection />
      <BestReviewSection />
    </div>
  );
}
