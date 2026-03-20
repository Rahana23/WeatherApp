import { useWeather } from './hooks/useWeather'
import { getWeatherBackground, getConditionFromCode } from './utils/weatherHelpers'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastCard from './components/ForecastCard'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  console.log('API KEY:', import.meta.env.VITE_OPENWEATHER_API_KEY)

  const { current, forecast, city, loading, error, fetchWeather } = useWeather()

  const bgGradient = current
    ? getWeatherBackground(getConditionFromCode(current.current.weather_code))
    : 'from-sky-500 via-blue-600 to-indigo-700'


  return (
    <div
      className={`
        min-h-screen w-full
        bg-linear-to-br ${bgGradient}
        transition-all duration-1000 ease-in-out
        flex flex-col items-center
        px-4 py-12
      `}
    >
      {/* App Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          🌤️ WeatherApp
        </h1>
        <p className="text-white/60 text-sm mt-1">
          Real-time weather for any city
        </p>
      </div>

      {/* Search */}
      <div className="w-full max-w-2xl mb-10">
        <SearchBar onSearch={fetchWeather} isLoading={loading} />
      </div>

      {/* Content */}
      <div className="w-full flex flex-col items-center">

        {/* State 1: Loading */}
        {loading && <LoadingSpinner />}

        {/* State 2: Error */}
        {!loading && error && (
          <div className="bg-red-500/20 border border-red-400/30 rounded-xl px-6 py-4 text-white text-center max-w-sm">
            <p className="text-lg mb-1">⚠️ Oops!</p>
            <p className="text-white/80 text-sm">{error}</p>
          </div>
        )}

        {/* State 3: Empty — no search yet */}
        {!loading && !error && !current && (
          <div className="text-center text-white/50 mt-12">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-lg font-medium text-white/70">
              Search for a city
            </p>
            <p className="text-sm mt-1">
              Try "London", "Accra", or "New York"
            </p>
          </div>
        )}

        {/* State 4: Data ready */}
        {!loading && !error && current && (
          <>
            <WeatherCard data={current} city={city!} />

            <ForecastCard forecast={forecast} />
          </>
        )}

      </div>
    </div>
  )
}

export default App
