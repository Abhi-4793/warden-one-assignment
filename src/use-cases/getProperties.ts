import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import {
  fetchLiveWeather,
  WeatherCodeToGroup,
} from "../services/weatherService";
import { buildPropertyWhere } from "../utils/propertyFilter";

export const getProperties = async (req: Request, res: Response) => {
  try {
    const {
      minTemp = "-20",
      maxTemp = "50",
      minHumidity = "0",
      maxHumidity = "100",
      weatherGroup = "",
      searchText = "",
    } = req.query;

    const minTempNum = Number(minTemp);
    const maxTempNum = Number(maxTemp);
    const minHumidityNum = Number(minHumidity);
    const maxHumidityNum = Number(maxHumidity);

    const lowerSearch =
      typeof searchText === "string" ? searchText.toLowerCase() : "";

    const baseProperties = await prisma.property.findMany({
      where: lowerSearch
        ? {
            OR: [{ city: { contains: lowerSearch } }],
          }
        : undefined,
    });

    const searchedProperties = baseProperties.filter((property) => {
      if (typeof searchText !== "string" || !searchText.trim()) return true;

      const q = searchText.toLowerCase();
      return (
        property.name?.toLowerCase().includes(q) ||
        property.city?.toLowerCase().includes(q) ||
        property.state?.toLowerCase().includes(q)
      );
    });

    console.log("====================================");
    console.log(baseProperties, "test");
    console.log("====================================");

    const propertiesWithWeather = await Promise.all(
      baseProperties.map(async (property) => {
        if (property.lat === null || property.lng === null) {
          return { ...property, weather: null };
        }
        const weather = await fetchLiveWeather(property.lat, property.lng);
        return { ...property, weather };
      })
    );

    const filtered = propertiesWithWeather.filter(({ weather }) => {
      if (!weather) return false;

      const tempOk =
        weather.temperature !== null &&
        weather.temperature >= minTempNum &&
        weather.temperature <= maxTempNum;

      const humidityOk =
        weather.humidity !== null &&
        weather.humidity >= minHumidityNum &&
        weather.humidity <= maxHumidityNum;

      const weatherGroupOk =
        !weatherGroup ||
        WeatherCodeToGroup(weather.weathercode) === weatherGroup;

      return tempOk && humidityOk && weatherGroupOk;
    });

    const finalResults = filtered.slice(0, 20);

    return res.json(finalResults);
  } catch (error) {
    console.error("Error fetching filtered properties:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
