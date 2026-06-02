import React, { useState } from "react";
import { Box, Text } from "ink";

interface HistoryScreenProps {
  onBack: () => void;
}

interface HistoryItem {
  id: string;
  method: string;
  url: string;
  statusCode: number;
  timestamp: string;
  duration: number;
}

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    method: "GET",
    url: "https://api.github.com/users/octocat",
    statusCode: 200,
    timestamp: "2 minutes ago",
    duration: 145,
  },
  {
    id: "2",
    method: "POST",
    url: "https://jsonplaceholder.typicode.com/posts",
    statusCode: 201,
    timestamp: "15 minutes ago",
    duration: 89,
  },
  {
    id: "3",
    method: "PUT",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    statusCode: 200,
    timestamp: "1 hour ago",
    duration: 112,
  },
  {
    id: "4",
    method: "DELETE",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    statusCode: 200,
    timestamp: "2 hours ago",
    duration: 67,
  },
  {
    id: "5",
    method: "GET",
    url: "https://api.stripe.com/v1/charges",
    statusCode: 401,
    timestamp: "3 hours ago",
    duration: 234,
  },
];

const getStatusColor = (status: number) => {
  if (status >= 200 && status < 300) return "green";
  if (status >= 300 && status < 400) return "yellow";
  return "red";
};

export default function HistoryScreen({ onBack }: HistoryScreenProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold>Request History</Text>
      </Box>

      <Box marginBottom={1}>
        <Text>{"\u2500".repeat(80)}</Text>
      </Box>

      {/* History List */}
      <Box flexDirection="column" marginBottom={2}>
        {mockHistory.map((item, index) => (
          <Box
            key={item.id}
            flexDirection="column"
            marginBottom={1}
          >
            <Box>
              <Box width={2}>
                <Text color={selectedIndex === index ? "blue" : "white"}>
                  {selectedIndex === index ? ">" : " "}
                </Text>
              </Box>
              <Box width={10}>
                <Text bold>{item.method}</Text>
              </Box>
              <Box width={8}>
                <Text color={getStatusColor(item.statusCode)}>
                  {item.statusCode}
                </Text>
              </Box>
              <Box flexGrow={1}>
                <Text>{item.url}</Text>
              </Box>
              <Box width={10} justifyContent="flex-end">
                <Text>{item.duration}ms</Text>
              </Box>
            </Box>
            {selectedIndex === index && (
              <Box marginLeft={2} marginTop={1}>
                <Text dimColor>{item.timestamp}</Text>
              </Box>
            )}
          </Box>
        ))}
      </Box>

      <Box marginBottom={2}>
        <Text>{"\u2500".repeat(80)}</Text>
      </Box>

      {/* Stats */}
      <Box flexDirection="column" marginBottom={2} gap={1}>
        <Box>
          <Box width={20}>
            <Text>Total Requests:</Text>
          </Box>
          <Text bold>{mockHistory.length}</Text>
        </Box>
        <Box>
          <Box width={20}>
            <Text>Success Rate:</Text>
          </Box>
          <Text bold color="green">
            {Math.round(
              ((mockHistory.filter((h) => h.statusCode < 400).length /
                mockHistory.length) *
                100)
            )}%
          </Text>
        </Box>
      </Box>

      <Box gap={3}>
        <Text color="white">Enter - Replay</Text>
        <Text color="white">D - Delete</Text>
        <Text color="white">Q - Back</Text>
      </Box>
    </Box>
  );
}
