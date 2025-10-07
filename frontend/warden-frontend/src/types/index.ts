export type Property = {
  id: number;
  name: string;
  address?: string | null;
  longitude: number;
  latitude: number;
  [key: string]: any;
};
export type Weather = {
  temperature: number | null;
  humidity: number | null;
  weathercode: number | null;
};

export type Filters = {
  minTemp?: number | "";
  maxTemp?: number | "";
  minHumidity?: number | "";
  maxHumidity?: number | "";
  weatherGroup?: string[] | string;
};

type WeatherData = {
  temperature: number;
  humidity: number;
  weathercode: number;
};

export type Location = {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  geohash5: string;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  weather: WeatherData;
};
