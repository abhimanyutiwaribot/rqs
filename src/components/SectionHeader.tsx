import { Box, Text } from "ink";
import type React from "react";

interface SectionHeaderProps {
  label: string;
  active: boolean;
  right?: React.ReactNode
}

export default function SectionHeader({ label, active, right}: SectionHeaderProps) {
  return (
    <Box justifyContent="space-between">
      <Text color={active ? "cyan" : "gray"} bold>
        {">"} {label}
      </Text>
      {right && <Text dimColor>{right}</Text>}
    </Box>
  );
}