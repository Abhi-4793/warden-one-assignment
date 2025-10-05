"use client";

import { useState, useEffect } from "react";
import { Box, Container, SimpleGrid, Button, Spinner } from "@chakra-ui/react";
import { useProperties } from "../hooks/useProperties";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
export default function HomePage() {
  const [q, setQ] = useState("");
  const { properties, isLoading, fetchWeatherForAll } = useProperties(q);
  const [visible, setVisible] = useState<any[]>([]);

  useEffect(() => {
    setVisible(properties.slice(0, 20));
  }, []);

  async function loadWeather() {
    const enriched = await fetchWeatherForAll(20);
    console.log("====================================");
    console.log(enriched, "test");
    console.log("====================================");
    setVisible(enriched);
    console.log("====================================");
    console.log(visible, "test1");
    console.log("====================================");
  }

  return (
    <Container maxW="container.lg" py={6}>
      <SearchBar q={q} setQ={setQ} onSearch={() => {}} />
      <Box mt={4}>
        <Button onClick={loadWeather}>Load Weather for Visible</Button>
      </Box>

      {isLoading ? (
        <Spinner mt={6} />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={6}>
          {visible.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
