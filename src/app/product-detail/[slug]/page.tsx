import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ProductImage from "@/src/components/product/ProductImage";
import ProductSummary from "@/src/components/product/ProductSummary";
import ProductTabs from "@/src/components/product/ProductTabs";
import InfoContent from "@/src/components/product/ProductInfoContent";
import SizeContent from "@/src/components/product/ProductSizeContent";
import ReviewContent from "@/src/components/review/ReviewContent";
import { getProductDetail } from "@/src/lib/data/products";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductDetail(slug);

  if (!product) notFound();

  return (
    <div className="flex flex-col lg:flex-row w-full py-4 gap-8">
      <div className="flex flex-col max-w-225 w-full">
        <ProductImage images={product.images} />
        <ProductTabs
          infoContent={<InfoContent productId={product.id} />}
          sizeContent={<SizeContent productId={product.id} />}
          reviewContent={<ReviewContent productId={product.id} />}
        />
      </div>
      <ProductSummary product={product} />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductDetail(slug);

  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}
