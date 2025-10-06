"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Button,
  Spinner,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useProperties } from "../hooks/useProperties";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";
import FiltersPanel from "../components/FiltersPanel";
import { Filters } from "@/types";

import { getWeatherLongandLang, WeatherCodeToGroup } from "@/libs/weather";
import { useDebounce } from "@/hooks/useDebounce";

export default function HomePage() {
  const [searchText, setSearchText] = useState("");

  const [filters, setFilters] = useState<Filters>({
    minTemp: "",
    maxTemp: "",
    minHumidity: "",
    maxHumidity: "",
    weatherGroup: "",
  });

  const debouncedSearch = useDebounce(searchText, 500);

  // ✅ Hook will refetch automatically when debouncedSearch changes
  const { properties, isLoading, mutate } = useProperties(
    debouncedSearch,
    filters
  );

  const [visible, setVisible] = useState<any[]>([]);

  useEffect(() => {
    if (properties.length > 0) {
      setVisible(properties.slice(0, 20));
    }
  }, [properties]);

  console.log("====================================");
  console.log(visible, "prop");
  console.log("====================================");

  function resetFilters() {
    setFilters({
      minTemp: "",
      maxTemp: "",
      minHumidity: "",
      maxHumidity: "",
      weatherGroup: "",
    });
  }

  return (
    <Container maxW="container.xl" py={6}>
      <SearchBar q={searchText} setQ={setSearchText} onSearch={() => {}} />
      <Flex mt={6} gap={6} direction={{ base: "column", md: "row" }}>
        <Box flex="1" minW="300px">
          <FiltersPanel
            filters={filters}
            setFilters={setFilters}
            onApply={() => mutate()}
            onReset={resetFilters}
          />
        </Box>
        <Box flex="3">
          {isLoading && (
            <Flex mt={6} align="center" justify="center">
              <Spinner />
              <Text ml={2}>Loading properties...</Text>
            </Flex>
          )}

          {!isLoading && (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10} mt={6}>
              {visible.length > 0 ? (
                visible.map((p) => <PropertyCard key={p.id} property={p} />)
              ) : (
                <Text color="gray.500" mt={4}>
                  No properties match your filters.
                </Text>
              )}
            </SimpleGrid>
          )}
        </Box>
      </Flex>
    </Container>
  );
}
