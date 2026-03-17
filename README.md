# 🌦️ WeatherApp

A real-time weather dashboard built with React, TypeScript, Vite, and Tailwind CSS.
Search any city in the world and get live weather data with a beautiful UI that
dynamically changes based on current conditions.

![WeatherApp](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss)

---

## ✨ Features

- 🌍 **Search any city** worldwide by name
- 🌡️ **Current conditions** — temperature, feels like, min/max
- 💧 **Humidity, wind speed & direction, visibility, pressure**
- 🌅 **Sunrise & sunset** times
- 📅 **5-day forecast** with daily high/low temperatures
- 🎨 **Dynamic backgrounds** that change with the weather condition
- ⚡ **Parallel API calls** via Promise.all for fast load times
- 💅 **Glassmorphism UI** with smooth 1s background transitions
- ⚠️ **Full error handling** — invalid cities, network failures, bad keys
- 🔒 **Secure** — API key stored in .env, never committed to Git

---

## 🖥️ Tech Stack

| Layer     | Technology         |
| --------- | ------------------ |
| Framework | React 18           |
| Language  | TypeScript 5       |
| Bundler   | Vite 8             |
| Styling   | Tailwind CSS v4    |
| Icons     | Lucide React       |
| Data      | OpenWeatherMap API |
| HTTP      | Native Fetch API   |

---

## 📁 Project Structure

```
weather-app/
├── src/
│   ├── components/
│   │   ├── SearchBar.tsx       # City search input with glassmorphism styling
│   │   ├── WeatherCard.tsx     # Main current weather display
│   │   ├── ForecastCard.tsx    # 5-day forecast strip
│   │   ├── WeatherDetail.tsx   # Reusable stat tile (humidity, wind, etc.)
│   │   └── LoadingSpinner.tsx  # Animated loading state
│   ├── hooks/
│   │   └── useWeather.ts       # Custom hook — all fetch logic lives here
│   ├── types/
│   │   └── weather.ts          # TypeScript interfaces for API responses
│   ├── utils/
│   │   └── weatherHelpers.ts   # Pure functions — temp, wind, date conversions
│   ├── App.tsx                 # Root component — wires everything together
│   └── index.css               # Tailwind import
├── .env.example                # Environment variable template
└── vite.config.ts              # Vite + Tailwind configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A free [OpenWeatherMap API key](https://openweathermap.org/api)

### Installation

1. **Clone the repository**

```bash
   git clone https://github.com/Rahana23/WeatherApp.git
   cd WeatherApp
```

2. **Install dependencies**

```bash
   npm install
```

3. **Set up environment variables**

```bash
   cp .env.example .env
```

Then open `.env` and replace `your_api_key_here` with your real OpenWeatherMap key:

```
   VITE_OPENWEATHER_API_KEY=your_actual_key
```

4. **Start the development server**

```bash
   npm run dev
```

5. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

---

## 🔑 Environment Variables

| Variable                   | Description                               | Required |
| -------------------------- | ----------------------------------------- | -------- |
| `VITE_OPENWEATHER_API_KEY` | Your free API key from openweathermap.org | ✅ Yes   |

> ⚠️ Never commit your real `.env` file to GitHub. It is listed in `.gitignore` by default.

---

## 🏗️ Architecture Decisions

**Custom Hook (`useWeather`)** — all API logic is isolated in one place. Components stay clean and don't need to know how data is fetched.

**Types first** — all TypeScript interfaces are defined in `src/types/weather.ts` before any components are written, giving full autocomplete and type safety throughout.

**Pure utility functions** — all data transformations (Kelvin → Celsius, m/s → km/h, Unix → readable time) live in `src/utils/weatherHelpers.ts` — easy to test and reuse.

**Four UI states** — every screen state is handled explicitly: loading, error, empty, and data. No blank screens or stale data.

---

## 📸 Screenshots

_Coming soon — API key activating_

---

## 👤 Author

**Saeed** — Staff Nurse turned Software Engineer

- GitHub: [@Rahana23](https://github.com/Rahana23)

---

## 📄 Licence

MIT
