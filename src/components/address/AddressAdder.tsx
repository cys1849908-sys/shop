"use client";
import { useModal } from "@/src/hooks/useModal";
import Modal from "../common/modals/Modal";
import AddressForm from "./AddressForm";
import { addAddress } from "@/src/lib/actions/address";
import { AddressInput } from "@/src/types/address";
import { useRouter } from "next/navigation";

export default function AddressAdder({
  isFirstAddress,
}: {
  isFirstAddress?: boolean;
}) {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const handleAddressSave = async (data: AddressInput) => {
    await addAddress(data);
    closeModal();

    router.refresh();
  };

  return (
    <div className="p-20 border-t border-gray-200">
      <div className="flex justify-center">
        <button
          className="text-center px-5 py-2 text-white bg-black cursor-pointer"
          onClick={openModal}
        >
          <span className="text-[14px]">배송지 추가</span>
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} backdropBlur>
        <AddressForm
          onSuccess={handleAddressSave}
          isFirstAddress={isFirstAddress}
        />
      </Modal>
    </div>
  );
}
