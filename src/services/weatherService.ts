// src/services/weatherService.ts
import fetch from "node-fetch";

export interface OpenMeteoResponse {
  current_weather?: {
    temperature: number;
    weathercode: number;
  };
  hourly?: {
    time: string[];
    relativehumidity_2m: number[];
  };
}

const WEATHER_GROUPS: Record<string, number[]> = {
  Clear: [0],
  Cloudy: [1, 2, 3],
  Drizzle: [51, 52, 53, 54, 55, 56, 57],
  Rainy: [61, 62, 63, 64, 65, 66, 67, 80, 81, 82],
  Snow: [71, 72, 73, 74, 75, 76, 77, 85, 86],
};

export function WeatherCodeToGroup(code: number | null): string | null {
  if (code === null) return null;
  for (const [group, codes] of Object.entries(WEATHER_GROUPS)) {
    if (codes.includes(code)) return group;
  }
  return "Other";
}

export async function fetchLiveWeather(latitude: number, longitude: number) {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
      `&current_weather=true&hourly=relativehumidity_2m&timezone=UTC`;

    const res = await fetch(url);
    const data = (await res.json()) as OpenMeteoResponse;

    const currentWeather = data.current_weather ?? null;
    let humidity: number | null = null;

    if (data.hourly && data.hourly.time && data.hourly.relativehumidity_2m) {
      const now = new Date();
      const idx = data.hourly.time.findIndex((t: string) => {
        const dt = new Date(t);
        return (
          dt.getUTCFullYear() === now.getUTCFullYear() &&
          dt.getUTCMonth() === now.getUTCMonth() &&
          dt.getUTCDate() === now.getUTCDate() &&
          dt.getUTCHours() === now.getUTCHours()
        );
      });
      humidity = idx !== -1 ? data.hourly.relativehumidity_2m[idx] : null;
    }

    console.log("====================================");
    console.log(data, "data");
    console.log("====================================");
    return {
      temperature: currentWeather ? currentWeather.temperature : null,
      humidity,
      weathercode: currentWeather ? currentWeather.weathercode : null,
    };
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    return { temperature: null, humidity: null, weathercode: null };
  }
}
