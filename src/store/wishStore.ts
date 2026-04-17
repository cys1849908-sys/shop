import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { clearWishlist, toggleWishlist } from "../lib/actions/wish";
import { WishStore } from "../types/wish";
import { ERROR_MESSAGES } from "@/src/constants/messages";

const logError = (context: string, error: unknown) => {
  console.error(`[${context}]`, error instanceof Error ? error.message : error);
};

export const useWishStore = create<WishStore>()(
  persist(
    (set, get) => ({
      wishedIds: new Set(),
      setWishedIds: (ids) => set({ wishedIds: new Set(ids) }),

      toggle: async (id) => {
        const prev = get().wishedIds;
        const next = new Set(prev);

        const isAdding = !next.has(id);
        if (isAdding) {
          next.add(id);
        } else {
          next.delete(id);
        }

        set({ wishedIds: next });

        try {
          await toggleWishlist(id);
        } catch (error) {
          logError(ERROR_MESSAGES.WISHLIST_TOGGLE_FAILED, error);
          set({ wishedIds: prev });
        }
      },

      isWished: (id) => get().wishedIds.has(id),

      clearAll: async () => {
        const prev = get().wishedIds;
        set({ wishedIds: new Set() });

        try {
          await clearWishlist();
        } catch (error) {
          logError(ERROR_MESSAGES.WISHLIST_CLEAR_FAILED, error);
          set({ wishedIds: prev });
        }
      },
    }),
    {
      name: "wish-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        ({
          wishedIds: Array.from(state.wishedIds),
        }) as any,
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.wishedIds)) {
          state.wishedIds = new Set(state.wishedIds);
        }
      },
    },
  ),
);
