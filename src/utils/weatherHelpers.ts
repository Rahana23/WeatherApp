import type { ForecastItem, ProcessedForecastDay } from "../types/weather";

// ─── Temperature ──────────────────────────────────────────────────────────────

export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

export const formatTemp = (kelvin: number): string => {
  return `${kelvinToCelsius(kelvin)}°C`;
};

// ─── Wind ─────────────────────────────────────────────────────────────────────

export const metresToKmh = (ms: number): number => {
  return Math.round(ms * 3.6);
};

export const degreesToCompass = (deg: number): string => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

// ─── Date & Time ──────────────────────────────────────────────────────────────

export const unixToDay = (unix: number): string => {
  return new Date(unix * 1000).toLocaleDateString("en-GB", {
    weekday: "short",
  });
};

export const unixToTime = (unix: number): string => {
  return new Date(unix * 1000).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatLastUpdated = (unix: number): string => {
  return new Date(unix * 1000).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ─── Forecast Processing ──────────────────────────────────────────────────────

export const processForecast = (
  items: ForecastItem[],
): ProcessedForecastDay[] => {
  const grouped: Record<string, ForecastItem[]> = {};

  items.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  return Object.entries(grouped)
    .slice(1, 6)
    .map(([, dayItems]) => {
      const midday = dayItems.find((item) => item.dt_txt.includes("12:00:00"));
      const representative = midday ?? dayItems[0];
      const temps = dayItems.map((i) => i.main.temp);
      const tempMax = kelvinToCelsius(Math.max(...temps));
      const tempMin = kelvinToCelsius(Math.min(...temps));

      return {
        date: unixToDay(representative.dt),
        tempMax,
        tempMin,
        condition: representative.weather[0].main,
        icon: representative.weather[0].icon,
      };
    });
};

// ─── Background Theme ─────────────────────────────────────────────────────────

export const getWeatherBackground = (condition: string): string => {
  const c = condition.toLowerCase();
  if (c === "clear") return "from-amber-400 via-orange-300 to-sky-400";
  if (c === "clouds") return "from-slate-400 via-gray-300 to-slate-500";
  if (c === "rain" || c === "drizzle")
    return "from-slate-700 via-blue-900 to-slate-800";
  if (c === "thunderstorm") return "from-gray-900 via-purple-900 to-gray-800";
  if (c === "snow") return "from-blue-100 via-white to-slate-200";
  if (c === "mist" || c === "fog" || c === "haze")
    return "from-gray-300 via-gray-200 to-gray-400";
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
    Mist: "🌫️",
    Fog: "🌫️",
    Haze: "🌫️",
    Tornado: "🌪️",
  };
  return map[condition] ?? "🌡️";
};
