"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import ProductList from "@/src/components/product/ProductList";
import { Product } from "@/src/types/product";
import { useAlert } from "@/src/hooks/useAlert";
import Modal from "@/src/components/common/modals/Modal";
import { useWishStore } from "@/src/store/wishStore";
import clsx from "clsx";

export default function WishlistClient({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const { isAlertOpen, alertMessage, openAlert, confirm, cancel } = useAlert();

  const clearAll = useWishStore((s) => s.clearAll);
  const wishedIds = useWishStore((s) => s.wishedIds);
  const products = initialProducts.filter((p) => wishedIds.has(p.id));

  const handleDelete = async () => {
    const isConfirmed = await openAlert({
      title: "전체삭제",
      message: "정말로 삭제하시겠습니까?",
      isCancelActive: true,
    });

    if (isConfirmed) {
      clearAll();
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
          <p className="text-[14px] font-bold text-gray-900">
            총 {products.length}건의 내역
          </p>
          <button
            className={clsx(
              "text-sm text-gray-500",
              wishedIds.size > 0 && "cursor-pointer",
            )}
            onClick={handleDelete}
            disabled={wishedIds.size === 0}
          >
            전체삭제
          </button>

          {isAlertOpen && (
            <Modal isOpen={true} onClose={cancel!} backdropBlur={true}>
              <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
                <p className="text-gray-500 my-4 text-sm leading-relaxed">
                  {alertMessage}
                </p>
                <div className="flex gap-2">
                  {cancel && (
                    <button
                      onClick={cancel}
                      className="flex-1 py-2 bg-gray-100 rounded text-sm"
                    >
                      취소
                    </button>
                  )}
                  <button
                    onClick={confirm}
                    className="flex-1 py-2 bg-black text-white rounded text-sm"
                  >
                    확인
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>

        {products.length > 0 ? (
          <ProductList products={products} cols={5} />
        ) : (
          <div className="flex flex-col items-center justify-center py-40">
            <Heart size={48} className="text-gray-200 mb-4" />
            <p className="text-gray-500 text-[14px] mb-6">
              찜한 상품이 없습니다.
            </p>
            <Link
              href="/"
              className="rounded-md bg-black px-8 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
            >
              인기 상품 보러가기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
