import AddressAdder from "@/src/components/address/AddressAdder";
import AddressCard from "@/src/components/address/AddressCard";
import { getAddress } from "@/src/lib/data/address";

export default async function AddressPage() {
  const addresses = await getAddress();
  const isFirstAddress = addresses.length === 0;

  return (
    <div className="p-4">
      <div className="mb-4">
        <h4 className="text-lg font-bold">배송지 관리</h4>
        <div className="border-b mt-2"></div>
      </div>
      {addresses.length > 0 ? (
        addresses.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-40">
          <span className="text-[14px] text-gray-500">
            배송지 정보가 없습니다.
          </span>
        </div>
      )}
      <div
        className="p-20 border-t border-gray-200 flex justify-center
      "
      >
        <AddressAdder isFirstAddress={isFirstAddress} />
      </div>
    </div>
  );
}
