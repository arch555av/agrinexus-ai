export type ProviderResult<T> = { available: boolean; provider: string; data: T | null; reason?: string };

export async function getWeather(_latitude: number, _longitude: number): Promise<ProviderResult<{ forecast: unknown[] }>> {
  const key = process.env.WEATHER_API_KEY;
  if (!key) return { available: false, provider: "Weather adapter", data: null, reason: "WEATHER_API_KEY is not configured" };
  return { available: false, provider: "Weather adapter", data: null, reason: "Provider adapter is intentionally disabled until a source is selected" };
}

export async function getPublicAgricultureData(_crop: string, _region: string): Promise<ProviderResult<{ sources: string[] }>> {
  const endpoint = process.env.PUBLIC_AGRI_DATA_URL;
  if (!endpoint) return { available: false, provider: "Public agriculture data adapter", data: null, reason: "PUBLIC_AGRI_DATA_URL is not configured" };
  return { available: false, provider: "Public agriculture data adapter", data: null, reason: "Source endpoint requires dataset-specific mapping" };
}
