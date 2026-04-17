import Link from "next/link";
import Image from "next/image";
import Modal from "../common/modals/Modal";
import { useModal } from "@/src/hooks/useModal";
import ChangeOptionModal from "./ChangeOptionModal";
import type { CartItem } from "@/src/types/cart";
import clsx from "clsx";
import { formatCurrency } from "@/src/lib/utils";

export default function CartItem({
  product,
  order = false,
  handleDelete,
  className = "",
}: {
  product: CartItem;
  handleDelete?: (type: "single", key: string) => Promise<void>;
  order?: boolean;
  className?: string;
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
      <div className="flex-1 flex flex-col justify-center">
        <Link className="text-sm" href={`/product/${product.slug}`}>
          {product.name}
        </Link>

        <p className="text-xs text-black mt-1">
          {product.size} | {product.quantity}개
        </p>
        <div className="flex items-center gap-2 mt-5">
          {product.discount && (
            <span className="text-[14px] text-red-500">
              {product.discount}%
            </span>
          )}
          <p className="text-[14px] ">
            {formatCurrency(product.price * product.quantity)}
          </p>
        </div>
      </div>
      {!order && (
        <div className="flex flex-col gap-2 justify-center">
          <button
            className="border border-gray-300 px-4 py-1 text-xs hover:bg-gray-50"
            onClick={openModal}
          >
            옵션 변경
          </button>
          <button
            className="border border-gray-300 px-4 py-1 text-xs hover:bg-gray-50"
            onClick={() => handleDelete?.("single", product.id)}
          >
            삭제
          </button>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={closeModal} backdropBlur>
        <ChangeOptionModal product={product} />
      </Modal>
    </div>
  );
}
