import type { ProcessedForecastDay } from '../types/weather'
import { getWeatherEmoji } from '../utils/weatherHelpers'

interface ForecastCardProps {
  forecast: ProcessedForecastDay[]
}

const ForecastCard = ({ forecast }: ForecastCardProps) => {
  if (forecast.length === 0) return null

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <h2 className="text-white/70 text-sm uppercase tracking-widest mb-3 text-center">
        5-Day Forecast
      </h2>
      <div className="grid grid-cols-5 gap-2">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="
              flex flex-col items-center gap-2
              bg-white/10 backdrop-blur-sm
              rounded-xl p-3 border border-white/10
              hover:bg-white/20 transition-colors duration-200
            "
          >
            <span className="text-white/70 text-xs font-medium uppercase">
              {day.date}
            </span>
            <span className="text-2xl">{getWeatherEmoji(day.condition)}</span>
            <span className="text-white font-semibold text-sm">{day.tempMax}°</span>
            <span className="text-white/50 text-xs">{day.tempMin}°</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ForecastCard