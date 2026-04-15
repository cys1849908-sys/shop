import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { clearWishlist, toggleWishlist } from "../lib/actions/wish";
import { WishStore } from "../types/wish";

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
          console.error("찜하기 실패:", error);
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
          console.error("전체 삭제 실패:", error);
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
