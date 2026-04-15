import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, CartStore, UpdateParams } from "../types/cart";
import {
  addToCart,
  removeItemsFromCart,
  updateCartItem,
} from "@/src/lib/actions/cart";
import { getCartItem } from "../lib/data/cart";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      checkoutItems: [],
      initializeItems: (items) => set({ items }),
      setCheckoutItems: (items) => set({ checkoutItems: items }),
      addItem: async (item: CartItem | CartItem[]) => {
        const previousItems = get().items;
        const itemsToAdd = Array.isArray(item) ? item : [item];
        set((state) => {
          const newItems = [...state.items];

          itemsToAdd.forEach((newItem) => {
            const existsIdx = newItems.findIndex((i) => i.id === newItem.id);

            if (existsIdx > -1) {
              newItems[existsIdx] = {
                ...newItems[existsIdx],
                quantity: newItems[existsIdx].quantity + newItem.quantity,
              };
            } else {
              newItems.push({ ...newItem, id: newItem.id });
            }
          });

          return { items: newItems };
        });

        try {
          await Promise.all(itemsToAdd.map((i) => addToCart(i)));
          const synced = await getCartItem();
          set({ items: synced });
        } catch (e) {
          set({ items: previousItems });
          console.error("장바구니 추가 실패:", e);
        }
      },

      removeItems: async (ids: string | string[]) => {
        const targetIds = Array.isArray(ids) ? ids : [ids];
        const previousItems = get().items;

        set((state) => ({
          items: state.items.filter((i) => !targetIds.includes(i.id)),
          checkoutItems: state.checkoutItems.filter(
            (i) => !targetIds.includes(i.id),
          ),
        }));

        try {
          await removeItemsFromCart(targetIds);
        } catch (e) {
          set({ items: previousItems });
          console.error("삭제 실패:", e);
        }
      },

      updateItem: async ({ id, quantity, size }: UpdateParams) => {
        const previousItems = get().items;
        const item = previousItems.find((i) => i.id === id);
        if (!item) return;

        set((state) => ({
          items: state.items.map((i) =>
            i.id === id
              ? {
                  ...i,
                  ...(quantity !== undefined && { quantity }),
                  ...(size && { size }),
                }
              : i,
          ),
        }));

        try {
          await updateCartItem(id, quantity ?? item.quantity, size);
        } catch (e) {
          set({ items: previousItems });
          console.error("업데이트 실패:", e);
        }
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
