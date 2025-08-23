import { createStore } from "zustand/vanilla";

export type FiltersState = {
  photostrip: string;
  background: string;
  filter: string;
  dateEnabled: boolean;
  stickers: "axolotl" | "cat" | "panda" | null;
};

export type FiltersActions = {
  setPhotostrip: (photostrip: string) => void;
  setBackground: (background: string) => void;
  setFilter: (filter: string) => void;
  setDateEnabled: () => void;
  setStickers: (stickers: "axolotl" | "cat" | "panda" | null) => void;
};

export type FiltersStore = FiltersState & FiltersActions;

export const defaultInitState: FiltersState = {
  photostrip: "#000",
  background: "#F6F0F0",
  filter: "no-filter",
  dateEnabled: true,
  stickers: null,
};

export const createFiltersStore = (
  initState: FiltersState = defaultInitState,
) => {
  return createStore<FiltersStore>()((set) => ({
    ...initState,
    setPhotostrip: (photostrip) => set({ photostrip }),
    setBackground: (background) => set({ background }),
    setFilter: (filter) => set({ filter }),
    setDateEnabled: () => set((state) => ({ dateEnabled: !state.dateEnabled })),
    setStickers: (stickers) => set({ stickers }),
  }));
};
