// src/api.ts
export async function api(endpoint: string) {
  // Example: Replace with your actual API logic
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error("API request failed");
  }
  return response.json();
}