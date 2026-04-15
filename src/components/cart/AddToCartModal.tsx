"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "../product/ProductCard";
import { Product } from "@/src/types/product";

const mockProducts: Product[] = [
  // {
  //   id: "1",
  //   name: "에이프릴 볼캡 (BROWN)",
  //   price: 36000,
  //   description: "심플한 디자인의 에이프릴 볼캡입니다.",
  //   categoryId: "cap",
  //   thumbnail: [
  //     "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
  //   ],
  //   images: [
  //     "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
  //   ],
  //   sizes: ["FREE"],
  //   stock: 50,
  //   isNew: true,
  // },
  // {
  //   id: "2",
  //   name: "에이프릴 볼캡 (BEIGE)",
  //   price: 36000,
  //   description: "심플한 디자인의 에이프릴 볼캡입니다.",
  //   categoryId: "cap",
  //   thumbnail: [
  //     "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
  //   ],
  //   images: [
  //     "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
  //   ],
  //   sizes: ["FREE"],
  //   stock: 50,
  // },
  // {
  //   id: "3",
  //   name: "에이프릴 볼캡 (CHARCOAL)",
  //   price: 36000,
  //   description: "심플한 디자인의 에이프릴 볼캡입니다.",
  //   categoryId: "cap",
  //   thumbnail: [
  //     "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
  //   ],
  //   images: [
  //     "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
  //   ],
  //   sizes: ["FREE"],
  //   stock: 50,
  // },
  // {
  //   id: "4",
  //   name: "에이프릴 볼캡 (NAVY)",
  //   price: 36000,
  //   description: "심플한 디자인의 에이프릴 볼캡입니다.",
  //   categoryId: "cap",
  //   thumbnail: [
  //     "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
  //   ],
  //   images: [
  //     "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
  //   ],
  //   sizes: ["FREE"],
  //   stock: 50,
  // },
];

export default function AddToCartModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-white px-6 mb-6">
      <h2 className="text-[18px]  text-gray-900 mb-5 text-center pt-2">
        장바구니 담기 완료
      </h2>
      <p className="text-[14px] font-bold text-gray-800 mb-4">
        함께 구매하면 좋은 상품
      </p>

      {/* 추천 상품 그리드 */}
      <div className="grid grid-cols-4 gap-2">
        {mockProducts.map((product) => (
          <div key={product.id} className="flex flex-col group">
            <Link
              href={`/products/${product.id}`}
              className="relative aspect-[3/4] w-full overflow-hidden bg-[#F7F7F7] mb-3"
            >
              <Image
                src={product.thumbnail[0]}
                alt={product.name!}
                fill
                sizes="150px"
                className="object-cover transition-transform duration-300"
              />
              {product.thumbnail[1] && (
                <Image
                  alt={`${product.name} hover`}
                  src={product.thumbnail[1]}
                  fill
                  sizes="280px"
                  draggable="false"
                  className="object-cover select-none bg-[#F7F7F7] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              )}
            </Link>
            <div className="flex flex-col">
              <span className="text-[12px] text-gray-700 leading-tight line-clamp-2">
                {product.name}
              </span>
              <span className="text-[14px] font-bold text-gray-900 mt-1">
                {product.price?.toLocaleString()}
              </span>

              <div className="flex items-center gap-1 mt-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5] border border-gray-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#8B4513]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#DEB887]" />
                <span className="text-[10px] text-gray-400 ml-0.5">+4</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex justify-center gap-2 mt-10 pb-8">
        <Link
          href="/cart"
          className=" border border-gray-300 w-33 h-12 rounded
          py-3.5 text-center text-[13px] font-medium text-gray-800 hover:bg-gray-50 transition-colors"
        >
          장바구니 보기
        </Link>
        <button
          className=" bg-black py-3.5 text-center  w-33 h-12 rounded
        text-[13px] font-medium text-white hover:bg-zinc-800 transition-colors"
          onClick={onClose}
        >
          쇼핑 계속하기
        </button>
      </div>
    </div>
  );
}
