interface WeatherDetailProps {
  icon: React.ReactNode
  label: string
  value: string
}

const WeatherDetail = ({ icon, label, value }: WeatherDetailProps) => {
  return (
    <div className="flex flex-col items-center gap-1 bg-white/10 rounded-xl p-4 flex-1">
      <div className="text-white/70 mb-1">{icon}</div>
      <span className="text-white/60 text-xs uppercase tracking-widest">{label}</span>
      <span className="text-white font-semibold text-lg">{value}</span>
    </div>
  )
}

export default WeatherDetail