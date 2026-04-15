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
          <span className="bg-[#f2f2f2] text-[#666] text-[11px] px-1.5 py-0.5 rounded-sm font-bold">
            기본
          </span>
        )}
        <span className="font-bold text-[15px] text-[#000]">
          {address.addressName}/{address.receiverName}
        </span>
        {actions && <div className="ml-auto">{actions}</div>}
      </div>
      <div className="text-[14px] text-[#333] mt-1">
        ({address.postcode}) {address.address} {address.detailAddress}
      </div>
      <div className="text-[14px] text-[#999]">{address.phone}</div>
    </div>
  );
}
