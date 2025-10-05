import axios from "axios";
import { Weather } from "@/types";

const weatherEndpoint = "https://api.open-meteo.com/v1/forecast";

export async function getWeatherLongandLang(
  lat: number,
  lon: number
): Promise<Weather> {
  try {
    const res = await axios.get(weatherEndpoint, {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,
        hourly: "relativehumidity_2m",
        timezone: "UTC",
      },
    });
    const data = res?.data;
    const current = data.current_weather ?? null;

    let humidity: number | null = null;

    if (data.hourly && data.hourly.time && data.hourly.relativehumidity_2m) {
      const currentTime = new Date().toISOString().slice(0, 13);
      console.log("====================================");
      console.log(currentTime, "currentTime");
      console.log("====================================");
      const idx = data.hourly.time.findIndex((t: string) =>
        t.startsWith(currentTime)
      );
      humidity = data.hourly.relativehumidity_2m[idx] ?? null;
    }

    return {
      temprature: current ? current.temprature : null,
      weathercode: current ? current.weathercode : null,
      humidity,
    };
  } catch (e) {
    console.error("Weather fetch failed", err);
    return { temprature: null, humidity: null, weathercode: null };
  }
}

export const WEATHER_GROUPS: Record<string, number[]> = {
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
