import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset } from 'lucide-react'
import type { CurrentWeatherResponse, CityInfo } from '../types/weather'
import {
  formatTemp,
  roundTemp,
  degreesToCompass,
  formatTime,
  formatLastUpdated,
  getWeatherEmoji,
  getDescriptionFromCode,
} from '../utils/weatherHelpers'
import WeatherDetail from './WeatherDetail'

interface WeatherCardProps {
  data: CurrentWeatherResponse
  city: CityInfo
}

const WeatherCard = ({ data, city }: WeatherCardProps) => {
  const c = data.current

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* City & Country */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-white tracking-tight">
          {city.name}
          <span className="text-2xl font-normal text-white/60 ml-3">
            {city.country}
          </span>
        </h1>
        <p className="text-white/60 text-sm mt-1">
          {formatLastUpdated(c.time)}
        </p>
      </div>

      {/* Main Temperature */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-2">
          {getWeatherEmoji(c.weather_code.toString())}
        </div>
        <div className="text-8xl font-thin text-white mb-2">
          {formatTemp(c.temperature_2m)}
        </div>
        <p className="text-white/80 text-xl capitalize">
          {getDescriptionFromCode(c.weather_code)}
        </p>
        <p className="text-white/60 text-sm mt-1">
          Feels like {formatTemp(c.apparent_temperature)}
        </p>
        <div className="flex justify-center gap-4 mt-3">
          <span className="text-white/70 text-sm">
            ↑ {roundTemp(data.daily.temperature_2m_max[0])}°
          </span>
          <span className="text-white/70 text-sm">
            ↓ {roundTemp(data.daily.temperature_2m_min[0])}°
          </span>
        </div>
      </div>

      {/* Detail Tiles */}
      <div className="flex gap-3 mb-6">
        <WeatherDetail
          icon={<Droplets size={20} />}
          label="Humidity"
          value={`${c.relative_humidity_2m}%`}
        />
        <WeatherDetail
          icon={<Wind size={20} />}
          label="Wind"
          value={`${Math.round(c.wind_speed_10m)} km/h ${degreesToCompass(c.wind_direction_10m)}`}
        />
        <WeatherDetail
          icon={<Eye size={20} />}
          label="Visibility"
          value={`${(c.visibility / 1000).toFixed(1)} km`}
        />
        <WeatherDetail
          icon={<Gauge size={20} />}
          label="Pressure"
          value={`${Math.round(c.surface_pressure)} hPa`}
        />
      </div>

      {/* Sunrise & Sunset */}
      <div className="flex justify-center gap-8 bg-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 text-white/80">
          <Sunrise size={20} className="text-amber-300" />
          <div>
            <p className="text-xs text-white/50">Sunrise</p>
            <p className="font-semibold">{formatTime(data.daily.sunrise[0])}</p>
          </div>
        </div>
        <div className="w-px bg-white/20" />
        <div className="flex items-center gap-2 text-white/80">
          <Sunset size={20} className="text-orange-300" />
          <div>
            <p className="text-xs text-white/50">Sunset</p>
            <p className="font-semibold">{formatTime(data.daily.sunset[0])}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default WeatherCard