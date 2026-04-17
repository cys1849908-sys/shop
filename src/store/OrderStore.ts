import { create } from "zustand";
import { OrderStore } from "../types/order";

export const useOrderStore = create<OrderStore>((set) => ({
  isValid: false,
  setIsValid: (v) => set({ isValid: v }),
}));
