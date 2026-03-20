import type { ForecastResponse, ProcessedForecastDay } from "../types/weather";

// ─── WMO Weather Code Mappings ────────────────────────────────────────────────
// Open-Meteo uses WMO weather codes instead of text conditions

const WMO_CONDITIONS: Record<number, string> = {
  0: "Clear",
  1: "Clear",
  2: "Clouds",
  3: "Clouds",
  45: "Fog",
  48: "Fog",
  51: "Drizzle",
  53: "Drizzle",
  55: "Drizzle",
  61: "Rain",
  63: "Rain",
  65: "Rain",
  71: "Snow",
  73: "Snow",
  75: "Snow",
  80: "Rain",
  81: "Rain",
  82: "Rain",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm",
};

const WMO_DESCRIPTIONS: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Icy fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Slight showers",
  81: "Moderate showers",
  82: "Heavy showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Heavy thunderstorm",
};

export const getConditionFromCode = (code: number): string => {
  return WMO_CONDITIONS[code] ?? "Clear";
};

export const getDescriptionFromCode = (code: number): string => {
  return WMO_DESCRIPTIONS[code] ?? "Clear sky";
};

// ─── Temperature ──────────────────────────────────────────────────────────────
// Open-Meteo already returns °C — no conversion needed!

export const formatTemp = (celsius: number): string => {
  return `${Math.round(celsius)}°C`;
};

export const roundTemp = (celsius: number): number => {
  return Math.round(celsius);
};

// ─── Wind ─────────────────────────────────────────────────────────────────────

export const degreesToCompass = (deg: number): string => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

// ─── Date & Time ──────────────────────────────────────────────────────────────

export const formatDay = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("en-GB", { weekday: "short" });
};

export const formatTime = (isoString: string): string => {
  return new Date(isoString).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatLastUpdated = (isoString: string): string => {
  return new Date(isoString).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ─── Forecast Processing ──────────────────────────────────────────────────────

export const processForecast = (
  data: ForecastResponse,
): ProcessedForecastDay[] => {
  return data.daily.time.slice(1, 6).map((dateStr, i) => {
    const code = data.daily.weather_code[i + 1];
    return {
      date: formatDay(dateStr),
      tempMax: roundTemp(data.daily.temperature_2m_max[i + 1]),
      tempMin: roundTemp(data.daily.temperature_2m_min[i + 1]),
      condition: getConditionFromCode(code),
      icon: "",
    };
  });
};

// ─── Background & Emoji ───────────────────────────────────────────────────────

export const getWeatherBackground = (condition: string): string => {
  const c = condition.toLowerCase();
  if (c === "clear") return "from-amber-400 via-orange-300 to-sky-400";
  if (c === "clouds") return "from-slate-400 via-gray-300 to-slate-500";
  if (c === "rain" || c === "drizzle")
    return "from-slate-700 via-blue-900 to-slate-800";
  if (c === "thunderstorm") return "from-gray-900 via-purple-900 to-gray-800";
  if (c === "snow") return "from-blue-100 via-white to-slate-200";
  if (c === "fog") return "from-gray-300 via-gray-200 to-gray-400";
  return "from-sky-400 via-blue-500 to-indigo-600";
};

export const getWeatherEmoji = (condition: string): string => {
  const map: Record<string, string> = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Fog: "🌫️",
    Mist: "🌫️",
  };
  return map[condition] ?? "🌡️";
};
