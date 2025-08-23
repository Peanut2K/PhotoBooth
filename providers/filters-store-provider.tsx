"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type FiltersStore, createFiltersStore } from "@/stores/filters-store";

export type FiltersStoreApi = ReturnType<typeof createFiltersStore>;

export const FiltersStoreContext = createContext<FiltersStoreApi | undefined>(
  undefined,
);

export interface FiltersStoreProviderProps {
  children: ReactNode;
}

export const FiltersStoreProvider = ({
  children,
}: FiltersStoreProviderProps) => {
  const storeRef = useRef<FiltersStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createFiltersStore();
  }

  return (
    <FiltersStoreContext.Provider value={storeRef.current}>
      {children}
    </FiltersStoreContext.Provider>
  );
};

export const useFiltersStore = <T,>(
  selector: (store: FiltersStore) => T,
): T => {
  const filtersStoreContext = useContext(FiltersStoreContext);

  if (!filtersStoreContext) {
    throw new Error(`useFiltersStore must be used within FiltersStoreProvider`);
  }

  return useStore(filtersStoreContext, selector);
};
