import { Box, Text } from "ink";

export function TabBar({
  tabs,
  active,
  focused,
}: {
  tabs: string[];
  active: string;
  focused: boolean;
}) {
  return (
    <Box gap={2}>
      {tabs.map(tab => (
        <Text
          key={tab}
          bold={tab === active}
          color={tab === active ? (focused ? "cyan" : "white") : "gray"}
          underline={tab === active && focused}
        >
          {tab}
        </Text>
      ))}
    </Box>
  );
}