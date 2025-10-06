"use client";

import { Input, Group, InputElement, Button } from "@chakra-ui/react";

export default function SearchBar({
  q,
  setQ,
  onSearch,
}: {
  q: string;
  setQ: (v: string) => void;
  onSearch: () => void;
}) {
  return (
    <Group attached w="full" maxW="xlg">
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        flex="1"
        placeholder="Search for the city "
      />
      {/* <Button onClick={onSearch} bg="bg.inverted">
        Search
      </Button> */}
    </Group>
  );
}
