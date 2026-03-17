import { useState, type KeyboardEvent } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSearch: (city: string) => void
  isLoading: boolean
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState('')

  const handleSearch = () => {
    const trimmed = inputValue.trim()
    if (trimmed) onSearch(trimmed)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="flex gap-2 w-full max-w-md mx-auto">
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
          size={18}
        />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search city..."
          disabled={isLoading}
          className="
            w-full pl-10 pr-4 py-3
            bg-white/20 backdrop-blur-sm
            border border-white/30 rounded-xl
            text-white placeholder:text-white/50
            focus:outline-none focus:ring-2 focus:ring-white/50
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
          "
        />
      </div>
      <button
        onClick={handleSearch}
        disabled={isLoading || !inputValue.trim()}
        className="
          px-5 py-3 bg-white/20 hover:bg-white/30
          backdrop-blur-sm border border-white/30
          rounded-xl text-white font-medium
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200 active:scale-95
        "
      >
        {isLoading ? '...' : 'Search'}
      </button>
    </div>
  )
}

export default SearchBar