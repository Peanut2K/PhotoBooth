import { createStore } from "zustand/vanilla";

export type ImagesState = {
  images: string[];
};

export type ImagesActions = {
  addImage: (image: string) => void;
  resetImages: () => void;
  addImages: (images: string[]) => void;
};

export type ImagesStore = ImagesState & ImagesActions;

export const defaultInitState: ImagesState = {
  images: [],
};

export const createImagesStore = (
  initState: ImagesState = defaultInitState,
) => {
  return createStore<ImagesStore>()((set) => ({
    ...initState,
    addImage: (image) => set((state) => ({ images: [...state.images, image] })),
    resetImages: () => set({ images: [] }),
    addImages: (images) =>
      set((state) => ({ images: [...images, ...state.images] })),
  }));
};
