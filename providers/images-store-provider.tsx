"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type ImagesStore, createImagesStore } from "@/stores/images-store";

export type ImagesStoreApi = ReturnType<typeof createImagesStore>;

export const ImagesStoreContext = createContext<ImagesStoreApi | undefined>(
  undefined,
);

export interface ImagesStoreProviderProps {
  children: ReactNode;
}

export const ImagesStoreProvider = ({ children }: ImagesStoreProviderProps) => {
  const storeRef = useRef<ImagesStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createImagesStore();
  }

  return (
    <ImagesStoreContext.Provider value={storeRef.current}>
      {children}
    </ImagesStoreContext.Provider>
  );
};

export const useImagesStore = <T,>(selector: (store: ImagesStore) => T): T => {
  const imagesStoreContext = useContext(ImagesStoreContext);

  if (!imagesStoreContext) {
    throw new Error(`useImagesStore must be used within ImagesStoreProvider`);
  }

  return useStore(imagesStoreContext, selector);
};
