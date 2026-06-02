interface RequestConfig {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string
}


export async function executeRequest(config: RequestConfig) {
  const start = Date.now();

  const response = await fetch(config.url, {
    method: config.method,
    headers: config.headers,
    body: config.body
  });

  const end = Date.now()

  const text = await response.text();

  return {
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body: text,
    time: end - start
  }
}