export interface Address {
  id: string;
  user_id: string;
  addressName: string;
  receiverName: string;
  phone: string;
  secondaryPhone?: string;
  postcode: string;
  address: string;
  detailAddress: string;
  isDefault: boolean;
  created_at: string;
}

export interface UpdateAddressRequest extends AddressInput {
  id: string;
}

export interface DeleteAddressRequest {
  id: string;
}
export type AddressInput = Omit<Address, "id" | "user_id" | "created_at">;
