import { useState, useCallback } from "react";
import type {
  GeocodingResponse,
  CurrentWeatherResponse,
  ForecastResponse,
  WeatherState,
} from "../types/weather";
import { processForecast } from "../utils/weatherHelpers";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export const useWeather = () => {
  const [state, setState] = useState<WeatherState>({
    current: null,
    forecast: [],
    city: null,
    loading: false,
    error: null,
  });

  const fetchWeather = useCallback(async (cityName: string) => {
    if (!cityName.trim()) return;

    // Step A: set loading
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      // Step B: convert city name → coordinates
      const geoRes = await fetch(
        `${GEO_URL}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`,
      );
      const geoData: GeocodingResponse = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City "${cityName}" not found`);
      }

      const { name, country, latitude, longitude } = geoData.results[0];

      // Step C: fetch current weather + forecast in parallel
      const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current: [
          "temperature_2m",
          "apparent_temperature",
          "relative_humidity_2m",
          "wind_speed_10m",
          "wind_direction_10m",
          "weather_code",
          "surface_pressure",
          "visibility",
          "is_day",
        ].join(","),
        daily: [
          "temperature_2m_max",
          "temperature_2m_min",
          "weather_code",
          "sunrise",
          "sunset",
        ].join(","),
        timezone: "auto",
        forecast_days: "6",
      });

      const [currentRes, forecastRes] = await Promise.all([
        fetch(`${WEATHER_URL}?${params}`),
        fetch(`${WEATHER_URL}?${params}`),
      ]);

      const currentData: CurrentWeatherResponse = await currentRes.json();
      const forecastData: ForecastResponse = await forecastRes.json();
      const processedForecast = processForecast(forecastData);

      setState({
        current: currentData,
        forecast: processedForecast,
        city: { name, country, lat: latitude, lon: longitude },
        loading: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Something went wrong",
      }));
    }
  }, []);

  return { ...state, fetchWeather };
};
