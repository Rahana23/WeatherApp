import { useState, useCallback } from "react";
import type {
  CurrentWeatherResponse,
  ForecastResponse,
  WeatherState,
} from "../types/weather";
import { processForecast } from "../utils/weatherHelpers";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const useWeather = () => {
  // ── 1. State ────────────────────────────────────────────────────────────────
  const [state, setState] = useState<WeatherState>({
    current: null,
    forecast: [],
    loading: false,
    error: null,
    city: "",
  });

  // ── 2. Fetch Function ───────────────────────────────────────────────────────
  const fetchWeather = useCallback(async (city: string) => {
    // Guard: don't fetch if input is blank
    if (!city.trim()) return;

    // Step A: set loading, clear previous error
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
      city,
    }));

    try {
      // Step B: fetch current weather AND forecast at the same time
      const [currentRes, forecastRes] = await Promise.all([
        fetch(
          `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`,
        ),
        fetch(
          `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}`,
        ),
      ]);

      // Step C: check for HTTP errors (e.g. 404 city not found)
      if (!currentRes.ok) {
        const errorData = await currentRes.json();
        throw new Error(errorData.message ?? "City not found");
      }

      // Step D: parse JSON from both responses
      const currentData: CurrentWeatherResponse = await currentRes.json();
      const forecastData: ForecastResponse = await forecastRes.json();

      // Step E: process raw forecast into our clean format
      const processedForecast = processForecast(forecastData.list);

      // Step F: save everything to state
      setState({
        current: currentData,
        forecast: processedForecast,
        loading: false,
        error: null,
        city,
      });
    } catch (err) {
      // Step G: handle any failure gracefully
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Something went wrong",
      }));
    }
  }, []);

  return { ...state, fetchWeather };
};
