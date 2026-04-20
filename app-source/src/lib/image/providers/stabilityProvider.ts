export async function generateCoverImage(prompt: string): Promise<string> {
  const fallback = `https://placehold.co/1024x1536/121212/2de2e6?text=${encodeURIComponent("Generated Cover")}`;

  const endpoint = process.env.IMAGE_API_URL;
  if (!endpoint) return fallback;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
      cache: "no-store",
    });
    if (!response.ok) return fallback;
    const data = (await response.json()) as { imageUrl?: string };
    return data.imageUrl ?? fallback;
  } catch {
    return fallback;
  }
}
