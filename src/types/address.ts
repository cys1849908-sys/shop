export type Address = {
  id: string;
  user_id: string;
  address_name: string;
  receiver_name: string;
  phone_number: string;
  secondary_phone?: string;
  postcode: string;
  address: string;
  detail_address: string;
  is_default: boolean;
  created_at: string;
};

export interface UpdateAddressRequest extends AddressInput {
  id: string;
}

export interface DeleteAddressRequest {
  id: string;
}

export type AddressInput = Omit<Address, "id" | "user_id" | "created_at">;
