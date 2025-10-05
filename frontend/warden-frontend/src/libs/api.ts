import axios from "axios";
import { Property } from "@/types";

const BACKEND_ENDPOINT =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function fecthProperties(
  q?: string,
  limit = 20
): Promise<Property[]> {
  const res = await axios.get(`${BACKEND_ENDPOINT}/get-properties`, {
    params: { q, limit },
  });
  return res?.data as Property[];
}
