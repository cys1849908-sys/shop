"use client";
import { Address } from "@/src/types/address";

export default function AddressCard({
  address,
  actions,
}: {
  address: Address;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 relative">
      <div className="flex items-center gap-2">
        {address.isDefault && (
          <span className="bg-gray-200 text-gray-500 text-[11px] px-1.5 py-0.5  font-bold">
            기본
          </span>
        )}
        <span className="font-bold text-[15px] text-black">
          {address.addressName}/{address.receiverName}
        </span>
        {actions && <div className="ml-auto">{actions}</div>}
      </div>
      <div className="text-[14px] text-gray-500 mt-1">
        ({address.postcode}) {address.address} {address.detailAddress}
      </div>
      <div className="flex items-center  gap-3">
        <div className="text-[14px] text-gray-500">{address.phoneNumber}</div>
        <div className="w-px h-3 bg-gray-200"></div>
        <div className="text-[14px] text-gray-500">{address.phoneNumber}</div>
      </div>
    </div>
  );
}
