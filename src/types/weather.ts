// ─── Geocoding ────────────────────────────────────────────────────────────────

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string; // region/state — optional
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
}

// ─── Current Weather ──────────────────────────────────────────────────────────

export interface CurrentWeather {
  time: string;
  temperature_2m: number; // °C
  apparent_temperature: number; // feels like °C
  relative_humidity_2m: number; // %
  wind_speed_10m: number; // km/h
  wind_direction_10m: number; // degrees
  weather_code: number; // WMO weather code
  surface_pressure: number; // hPa
  visibility: number; // metres
  is_day: number; // 1 = day, 0 = night
}

export interface CurrentWeatherResponse {
  current: CurrentWeather;
  daily: {
    sunrise: string[];
    sunset: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

// ─── Forecast ─────────────────────────────────────────────────────────────────

export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
}

export interface ForecastResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
}

// ─── App-Level Types ──────────────────────────────────────────────────────────

export interface ProcessedForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: string;
}

export interface CityInfo {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface WeatherState {
  current: CurrentWeatherResponse | null;
  forecast: ProcessedForecastDay[];
  city: CityInfo | null;
  loading: boolean;
  error: string | null;
}
