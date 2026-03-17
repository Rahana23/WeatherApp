// ─── Raw API Response Types ───────────────────────────────────────────────────

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WindData {
  speed: number;
  deg: number;
  gust?: number;
}

export interface CurrentWeatherResponse {
  name: string;
  dt: number;
  weather: WeatherCondition[];
  main: MainWeatherData;
  wind: WindData;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  cod: number;
}

// ─── Forecast Types ───────────────────────────────────────────────────────────

export interface ForecastItem {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  wind: WindData;
  dt_txt: string;
}

export interface ForecastResponse {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
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

export interface WeatherState {
  current: CurrentWeatherResponse | null;
  forecast: ProcessedForecastDay[];
  loading: boolean;
  error: string | null;
  city: string;
}
