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
