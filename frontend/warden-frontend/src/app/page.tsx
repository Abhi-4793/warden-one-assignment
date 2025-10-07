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
  HStack,
} from "@chakra-ui/react";
import { useProperties } from "../hooks/useProperties";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";
import FiltersPanel from "../components/FiltersPanel";
import { Filters, Location } from "@/types";

import { useDebounce } from "@/hooks/useDebounce";

export default function HomePage() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const [filters, setFilters] = useState<Filters>({
    minTemp: "",
    maxTemp: "",
    minHumidity: "",
    maxHumidity: "",
    weatherGroup: "",
  });

  const debouncedSearch = useDebounce(searchText, 500);

  const { properties, totalCount, isLoading, mutate } = useProperties(
    debouncedSearch,
    filters,
    page,
    pageSize
  );
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters]);
  const totalPages = Math.ceil((totalCount ?? 0) / pageSize);

  function onPageChange(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
    // mutate(); // trigger refetch with new page
  }

  // const [visible, setVisible] = useState<any[]>([]);

  // useEffect(() => {
  //   if (properties.length > 0) {
  //     setVisible(properties.slice(0, 20));
  //   }
  // }, [properties]);

  // console.log("====================================");
  // console.log(visible, "prop");
  // console.log("====================================");

  function resetFilters() {
    setFilters({
      minTemp: "",
      maxTemp: "",
      minHumidity: "",
      maxHumidity: "",
      weatherGroup: "",
    });
  }
  console.log("====================================");
  console.log(properties, "prop");
  console.log("====================================");
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
              <Text ml={2}>Loading Properties Accroding to Weather...</Text>
            </Flex>
          )}

          {!isLoading && (
            <>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10} mt={6}>
                {properties.length > 0 ? (
                  properties.map((p: Location) => (
                    <PropertyCard key={p.id} property={p} />
                  ))
                ) : (
                  <Text color="gray.500" mt={4}>
                    No Weather for Properties match your filters.
                  </Text>
                )}
              </SimpleGrid>
              {totalPages > 1 && (
                <HStack mt={6} justifyContent="center">
                  <Button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <Text>
                    Page {page} of {totalPages}
                  </Text>
                  <Button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </HStack>
              )}
            </>
          )}
        </Box>
      </Flex>
    </Container>
  );
}
