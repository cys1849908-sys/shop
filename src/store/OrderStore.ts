import { create } from "zustand";
import { OrderStore } from "../types/order";

export const useOrderStore = create<OrderStore>((set) => ({
  order: null,
  isValid: false,
  setIsValid: (v: any) => set({ isValid: v }),
}));
