export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

export type ResponseData =
  | { status: number; headers: Record<string, string>; body: string; time: number }
  | { error: string; time: number };

export interface KVPair { key: string; value: string; }  