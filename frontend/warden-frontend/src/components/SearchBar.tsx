"use client";

import { Input, InputGroup, InputElement, Button } from "@chakra-ui/react";

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
    <InputGroup>
      <>
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search properties by name or address..."
        />
        <InputElement>
          <Button size="sm" onClick={onSearch}>
            Search
          </Button>
        </InputElement>
      </>
    </InputGroup>
  );
}
