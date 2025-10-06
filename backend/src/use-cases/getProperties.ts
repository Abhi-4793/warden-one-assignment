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
      page = "1",
      pageSize = "20",
    } = req.query;

    const minTempNum = Number(minTemp);
    const maxTempNum = Number(maxTemp);
    const minHumidityNum = Number(minHumidity);
    const maxHumidityNum = Number(maxHumidity);
    const pageNum = Math.max(1, Number(page));
    const pageSizeNum = Math.max(1, Number(pageSize));
    const skip = (pageNum - 1) * pageSizeNum;

    const totalCount = await prisma.property.count({
      where: buildPropertyWhere(req),
    });

    const baseProperties = await prisma.property.findMany({
      skip,
      take: pageSizeNum,
      where: buildPropertyWhere(req),
    });

    // Fetch live weather for these properties
    const propertiesWithWeather = await Promise.all(
      baseProperties.map(async (property) => {
        if (property.lat === null || property.lng === null) {
          return { ...property, weather: null };
        }
        const weather = await fetchLiveWeather(property.lat, property.lng);
        return { ...property, weather };
      })
    );
    // console.log("====================================");
    // console.log(propertiesWithWeather, "baseProperties");
    // console.log("====================================");

    // Apply weather filters
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

    // console.log("====================================");
    // console.log(filtered, "page");
    // console.log("====================================");

    const pagedResults = filtered.slice(0, pageSizeNum);

    return res.json({
      totalCount,
      page: pageNum,
      pageSize: pageSizeNum,
      results: pagedResults,
    });
  } catch (error) {
    console.error("Error fetching filtered properties:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
