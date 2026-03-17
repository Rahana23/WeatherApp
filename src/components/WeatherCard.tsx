import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset } from 'lucide-react'
import type { CurrentWeatherResponse } from '../types/weather'
import {
  formatTemp,
  kelvinToCelsius,
  metresToKmh,
  degreesToCompass,
  unixToTime,
  formatLastUpdated,
  getWeatherEmoji,
} from '../utils/weatherHelpers'
import WeatherDetail from './WeatherDetail'

interface WeatherCardProps {
  data: CurrentWeatherResponse
}

const WeatherCard = ({ data }: WeatherCardProps) => {
  const condition = data.weather[0]

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* City & Country */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-white tracking-tight">
          {data.name}
          <span className="text-2xl font-normal text-white/60 ml-3">
            {data.sys.country}
          </span>
        </h1>
        <p className="text-white/60 text-sm mt-1">
          {formatLastUpdated(data.dt)}
        </p>
      </div>

      {/* Main Temperature */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-2">{getWeatherEmoji(condition.main)}</div>
        <div className="text-8xl font-thin text-white mb-2">
          {formatTemp(data.main.temp)}
        </div>
        <p className="text-white/80 text-xl capitalize">{condition.description}</p>
        <p className="text-white/60 text-sm mt-1">
          Feels like {formatTemp(data.main.feels_like)}
        </p>
        <div className="flex justify-center gap-4 mt-3">
          <span className="text-white/70 text-sm">
            ↑ {kelvinToCelsius(data.main.temp_max)}°
          </span>
          <span className="text-white/70 text-sm">
            ↓ {kelvinToCelsius(data.main.temp_min)}°
          </span>
        </div>
      </div>

      {/* Detail Tiles */}
      <div className="flex gap-3 mb-6">
        <WeatherDetail
          icon={<Droplets size={20} />}
          label="Humidity"
          value={`${data.main.humidity}%`}
        />
        <WeatherDetail
          icon={<Wind size={20} />}
          label="Wind"
          value={`${metresToKmh(data.wind.speed)} km/h ${degreesToCompass(data.wind.deg)}`}
        />
        <WeatherDetail
          icon={<Eye size={20} />}
          label="Visibility"
          value={`${(data.visibility / 1000).toFixed(1)} km`}
        />
        <WeatherDetail
          icon={<Gauge size={20} />}
          label="Pressure"
          value={`${data.main.pressure} hPa`}
        />
      </div>

      {/* Sunrise & Sunset */}
      <div className="flex justify-center gap-8 bg-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 text-white/80">
          <Sunrise size={20} className="text-amber-300" />
          <div>
            <p className="text-xs text-white/50">Sunrise</p>
            <p className="font-semibold">{unixToTime(data.sys.sunrise)}</p>
          </div>
        </div>
        <div className="w-px bg-white/20" />
        <div className="flex items-center gap-2 text-white/80">
          <Sunset size={20} className="text-orange-300" />
          <div>
            <p className="text-xs text-white/50">Sunset</p>
            <p className="font-semibold">{unixToTime(data.sys.sunset)}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default WeatherCard