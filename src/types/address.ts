export type Address = {
  id: string;
  userId: string;
  addressName: string;
  receiverName: string;
  phoneNumber: string;
  secondaryPhone?: string;
  postcode: string;
  address: string;
  detailAddress: string;
  isDefault: boolean;
  createdAt: string;
};

export interface UpdateAddressRequest extends AddressInput {
  id: string;
}

export interface DeleteAddressRequest {
  id: string;
}

export type AddressInput = Omit<Address, "id" | "user_id" | "created_at">;
