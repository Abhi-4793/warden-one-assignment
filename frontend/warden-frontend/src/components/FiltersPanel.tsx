"use client";

import { useState, useEffect } from "react";
import { Box, Input, Select, Grid, Heading, Button } from "@chakra-ui/react";
import { WEATHER_GROUPS } from "@/libs/weather";
import { Filters } from "@/types";

type Props = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  onApply?: () => void;
  onReset?: () => void;
};

export default function FiltersPanel({
  filters,
  setFilters,
  onApply,
  onReset,
}: Props) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  function applyFilters() {
    setFilters(localFilters);
    if (onApply) onApply();
  }

  function resetFilters() {
    const cleared: Filters = {
      minTemp: "",
      maxTemp: "",
      minHumidity: "",
      maxHumidity: "",
      weatherGroup: "",
    };
    setLocalFilters(cleared);
    setFilters(cleared);
    if (onReset) onReset();
  }

  if (!WEATHER_GROUPS || Object.keys(WEATHER_GROUPS).length === 0) {
    return <Box p={4}>Loading filters...</Box>;
  }

  return (
    <Box border="1px solid #e2e8f0" p={4} borderRadius="md">
      <Heading size="sm" mb={3}>
        Filters
      </Heading>

      <Grid templateColumns="repeat(2, 1fr)" gap={3}>
        <Input
          placeholder="Min Temp (°C)"
          value={localFilters.minTemp ?? ""}
          onChange={(e) =>
            setLocalFilters({
              ...localFilters,
              minTemp: e.target.value === "" ? "" : Number(e.target.value),
            })
          }
          type="number"
        />
        <Input
          placeholder="Max Temp (°C)"
          value={localFilters.maxTemp ?? ""}
          onChange={(e) =>
            setLocalFilters({
              ...localFilters,
              maxTemp: e.target.value === "" ? "" : Number(e.target.value),
            })
          }
          type="number"
        />
        <Input
          placeholder="Min Humidity (%)"
          value={localFilters.minHumidity ?? ""}
          onChange={(e) =>
            setLocalFilters({
              ...localFilters,
              minHumidity: e.target.value === "" ? "" : Number(e.target.value),
            })
          }
          type="number"
        />
        <Input
          placeholder="Max Humidity (%)"
          value={localFilters.maxHumidity ?? ""}
          onChange={(e) =>
            setLocalFilters({
              ...localFilters,
              maxHumidity: e.target.value === "" ? "" : Number(e.target.value),
            })
          }
          type="number"
        />

        <select
          value={localFilters.weatherGroup ?? ""}
          onChange={(e) =>
            setLocalFilters({
              ...localFilters,
              weatherGroup: e.target.value,
            })
          }
        >
          <option value="">All</option>
          {Object.keys(WEATHER_GROUPS).map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </Grid>

      <Box mt={3} display="flex" gap={2}>
        <Button size="sm" colorScheme="blue" onClick={applyFilters}>
          Apply
        </Button>
        <Button size="sm" onClick={resetFilters}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}
