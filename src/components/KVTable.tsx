import { Box , Text} from "ink";

export interface KVPair { key: string; value: string; }
export type EditingField = "none" | "url" | "body" | "param-key" | "param-value" | "header-key" | "header-value";


export function KVTable({
  pairs,
  cursor,
  editingField,
  draftKey,
  draftValue,
  fieldPrefix,
}: {
  pairs: KVPair[];
  cursor: number;
  editingField: EditingField;
  draftKey: string;
  draftValue: string;
  fieldPrefix: "param" | "header";
}) {
  const keyField   = `${fieldPrefix}-key`   as EditingField;
  const valueField = `${fieldPrefix}-value` as EditingField;
  const isDrafting = editingField === keyField || editingField === valueField;

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Box width={24}><Text dimColor>Key</Text></Box>
        <Text dimColor>Value</Text>
      </Box>

      {pairs.map((p, i) => {
        const sel = i === cursor;
        return (
          <Box key={i}>
            <Box width={2}><Text color="cyan">{sel ? "▶" : " "}</Text></Box>
            <Box width={22}><Text color={sel ? "white" : "gray"}>{p.key || "—"}</Text></Box>
            <Text color={sel ? "white" : "gray"}>{p.value || "—"}</Text>
          </Box>
        );
      })}

      {isDrafting && (
        <Box>
          <Box width={2}><Text color="cyan">▶</Text></Box>
          <Box width={22}>
            <Text color="white">
              {draftKey}{editingField === keyField ? <Text color="cyan">█</Text> : ""}
            </Text>
          </Box>
          <Text color="white">
            {draftValue}{editingField === valueField ? <Text color="cyan">█</Text> : ""}
          </Text>
        </Box>
      )}

      {pairs.length === 0 && !isDrafting && (
        <Text dimColor>  No entries — press A to add</Text>
      )}

      <Box marginTop={1} gap={2}>
        <Text dimColor>[A] Add</Text>
        <Text dimColor>[D] Delete</Text>
        <Text dimColor>[↑↓] Navigate</Text>
      </Box>
    </Box>
  );
}