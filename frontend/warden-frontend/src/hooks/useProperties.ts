"use client";
import useSWR from "swr";
import { Property, Filters } from "@/types";
import { fecthProperties } from "@/libs/api";

export function useProperties(searchText?: string, filters?: Filters) {
  const key = ["properties", searchText, JSON.stringify(filters)];

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => fecthProperties(searchText ?? "", filters),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  );

  const properties: Property[] = data ?? [];
  return { properties, error, isLoading, mutate };
}
