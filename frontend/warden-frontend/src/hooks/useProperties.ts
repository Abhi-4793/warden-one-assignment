"use client";
import useSWR from "swr";
import { Property } from "@/types";
import { fecthProperties } from "@/libs/api";
import { getWeatherLongandLang } from "@/libs/weather";
import { useSwitch } from "@chakra-ui/react";

export function useProperties(searchQuery?: string) {
  const { data, error, isLoading } = useSWR(
    ["properties", searchQuery],
    () => fecthProperties(searchQuery),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  );

  const properties = data ?? [];
  async function withWeather(property: Property) {
    const w = await getWeatherLongandLang(
      property.latitude,
      property.longitude
    );
    return { ...property, weather: w };
  }

  async function fetchWeatherForAll(limit = 10) {
    const subset = properties.slice(0, limit);
    console.log("====================================");
    console.log(subset, "sub");
    console.log("====================================");
    const results = await Promise.all(
      subset.map(async (p) => {
        const w = await getWeatherLongandLang(p?.lat, p?.lng);
        return { ...p, weather: w };
      })
    );
    return results;
  }

  return { properties, error, isLoading, withWeather, fetchWeatherForAll };
}
