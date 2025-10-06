import axios from "axios";
import { Filters } from "@/types";

const backendBaseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function fecthProperties(searchText = "", filters?: Filters) {
  const params: Record<string, any> = {};

  if (searchText) params.searchText = searchText;

  if (filters) {
    if (filters.minTemp) params.minTemp = filters.minTemp;
    if (filters.maxTemp) params.maxTemp = filters.maxTemp;
    if (filters.minHumidity) params.minHumidity = filters.minHumidity;
    if (filters.maxHumidity) params.maxHumidity = filters.maxHumidity;
    if (filters.weatherGroup) params.weatherGroup = filters.weatherGroup;
  }

  const response = await axios.get(`${backendBaseURL}/get-properties`, {
    params,
  });

  return response.data;
}
