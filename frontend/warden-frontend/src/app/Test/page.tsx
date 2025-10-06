"use client";

import { Select } from "@chakra-ui/react";

export default function TestPage() {
  return (
    <div style={{ padding: 20 }}>
      <Select.Root>
        <Select.Label>Select Weather</Select.Label>
        <Select.Trigger>
          <Select.ValueText placeholder="Select option" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="Clear">Clear</Select.Item>
          <Select.Item value="Cloudy">Cloudy</Select.Item>
          <Select.Item value="Rainy">Rainy</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  );
}
