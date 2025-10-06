"use client";
import useSWR from "swr";
import { Property, Filters } from "@/types";
import { fecthProperties } from "@/libs/api";

export function useProperties(
  searchText?: string,
  filters?: Filters,
  page = 1,
  pageSize = 20
) {
  const key = [
    "properties",
    searchText,
    JSON.stringify(filters),
    page,
    pageSize,
  ];

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => fecthProperties(searchText ?? "", filters, page, pageSize),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  );

  return {
    properties: data?.results ?? [],
    totalCount: data?.totalCount ?? 0,
    page: data?.page ?? 1,
    pageSize: data?.pageSize ?? 20,
    error,
    isLoading,
    mutate,
  };
}
