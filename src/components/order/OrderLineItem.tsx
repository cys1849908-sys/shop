"use client";
import Link from "next/link";
import Image from "next/image";
import Modal from "../common/modals/Modal";
import { useModal } from "@/src/hooks/useModal";
import ChangeOptionModal from "../cart/ChangeOptionModal";
import clsx from "clsx";
import { calculateDisplayPrice } from "@/src/lib/utils";
import ReviewWriteModal from "../review/ReviewWriteModal";
import { OrderItem } from "@/src/types/order";
import { CartItem } from "@/src/types/cart";

export default function OrderLineItem({
  product,
  className = "",
  cart = false,
  order = false,
  readOnly = false,
  handleDelete,
}: {
  product: CartItem | OrderItem;
  className?: string;
  cart?: boolean;
  order?: boolean;
  readOnly?: boolean;
  handleDelete?: (type: "single", key: string) => Promise<void>;
}) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div
      className={clsx(
        "flex justify-between items-center gap-4 w-full",
        className,
      )}
    >
      <div className="w-24 h-32 bg-gray-200 relative shrink-0">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div
        className={clsx(
          "flex-1 flex flex-col justify-center",
          readOnly ? "pointer-events-none" : "",
        )}
      >
        <Link className="text-sm" href={`/product/${product.slug}`}>
          {product.name}
        </Link>

        <p className="text-xs text-black mt-1">
          사이즈: {product.size} / 수량{product.quantity}개
        </p>
        <div className="flex items-center gap-2 mt-5">
          {product.discountRate && (
            <span className="text-[14px] text-red-500">
              {product.discountRate}%
            </span>
          )}
          <p className="text-[14px] ">
            {calculateDisplayPrice(product.unitPrice, product.discountRate)}
          </p>
        </div>
      </div>
      {cart && !readOnly && (
        <div className="flex flex-col gap-2 justify-center">
          <button
            className="border border-gray-300 px-4 py-1 text-xs hover:bg-gray-50 cursor-pointer"
            onClick={openModal}
          >
            옵션 변경
          </button>
          <button
            className="border border-gray-300 px-4 py-1 text-xs hover:bg-gray-50 cursor-pointer"
            onClick={() => handleDelete?.("single", product.id)}
          >
            삭제
          </button>
        </div>
      )}

      {order && (
        <button
          className="border text-black border-gray-200 px-4 py-2 text-xs cursor-pointer "
          onClick={openModal}
        >
          리뷰 작성
        </button>
      )}

      <Modal isOpen={isOpen} onClose={closeModal} backdropBlur>
        {cart && <ChangeOptionModal product={product} />}
        {order && (
          <ReviewWriteModal
            title="리뷰 작성"
            onClose={closeModal}
            orderId={(product as OrderItem).orderId}
            productId={product.productId}
            productName={product.name}
          />
        )}
      </Modal>
    </div>
  );
}
