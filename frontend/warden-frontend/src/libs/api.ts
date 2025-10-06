import axios from "axios";
import { Filters } from "@/types";

const backendBaseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function fecthProperties(
  searchText = "",
  filters?: Filters,
  page: number = 1,
  pageSize: number = 20
) {
  const params: Record<string, any> = {};

  if (searchText) params.searchText = searchText;

  if (filters) {
    if (filters.minTemp) params.minTemp = filters.minTemp;
    if (filters.maxTemp) params.maxTemp = filters.maxTemp;
    if (filters.minHumidity) params.minHumidity = filters.minHumidity;
    if (filters.maxHumidity) params.maxHumidity = filters.maxHumidity;
    if (filters.weatherGroup) params.weatherGroup = filters.weatherGroup;
  }

  params.page = page;
  params.pageSize = pageSize;

  const response = await axios.get(`${backendBaseURL}/get-properties`, {
    params,
  });
  console.log("====================================");
  console.log(response, "response");
  console.log("====================================");
  return response?.data;
}
