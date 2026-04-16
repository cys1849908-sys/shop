export interface Address {
  id: string;
  user_id: string;
  address_name: string; // 수정
  receiver_name: string; // 수정
  phone_number: string; // 수정
  secondary_phone?: string; // 수정
  postcode: string;
  address: string;
  detail_address: string; // 수정
  is_default: boolean; // 수정
  created_at: string;
}

export interface UpdateAddressRequest extends AddressInput {
  id: string;
}

export interface DeleteAddressRequest {
  id: string;
}

export type AddressInput = Omit<Address, "id" | "user_id" | "created_at">;
