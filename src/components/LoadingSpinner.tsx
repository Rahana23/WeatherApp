const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      <p className="text-white/80 text-sm font-medium tracking-wide">
        Fetching weather data...
      </p>
    </div>
  )
}

export default LoadingSpinner