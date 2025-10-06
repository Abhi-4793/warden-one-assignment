"use client";

import { Box, Text, Heading } from "@chakra-ui/react";
import { Property } from "../types";

import { WeatherCodeToGroup } from "@/libs/weather";

export default function PropertyCard({
  property,
}: {
  property: Property & { weather?: any };
}) {
  const w = property.weather;
  return (
    <Box border="1px solid #094364ff" shadow="md" borderRadius="md" p={4}>
      <Heading size="sm">{property.name}</Heading>
      <Text fontSize="sm" color="gray.600">
        {property.address ?? ""}
      </Text>
      {w ? (
        <Box mt={2}>
          <Text>Temp: {w.temperature ?? "—"} °C</Text>
          <Text>Humidity: {w.humidity ?? "—"} %</Text>
          <Text>
            Weather: {WeatherCodeToGroup(w.weathercode ?? null) ?? "—"}
          </Text>
        </Box>
      ) : (
        <Text mt={2} color="gray.500">
          Weather not loaded
        </Text>
      )}
    </Box>
  );
}
