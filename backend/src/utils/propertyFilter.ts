import { Request } from "express";
export function buildPropertyWhere(req: Request) {
  const { searchText } = req.query;

  if (typeof searchText !== "string" || !searchText.trim()) return undefined;

  const query = searchText.trim();
  return {
    OR: [
      { city: { contains: query } },
      { name: { contains: query } },
      { state: { contains: query } },
    ],
  };
}
