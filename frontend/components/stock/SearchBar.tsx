'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, XCircle } from 'lucide-react'
import { useQuery } from '@tanstack/react-query' 
import api from '@/lib/api' 
import { useRouter } from 'next/navigation'

interface Stock {
  symbol: string
  name: string
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  const { data: stockList = [] } = useQuery<Stock[]>({
    queryKey: ['stockList'],
    queryFn: async () => {
      const res = await api.get('/stock')
      return res.data
    },
    staleTime: 1000 * 60 * 60 * 24,
  })

  const results = query.length >= 1
    ? stockList
        .filter((s) => s.symbol.toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, 10)
    : []

  const handleSelect = (symbol: string) => {
    router.push(`/stock/${symbol}`)
    setQuery('')
    setIsOpen(false)
  }

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setIsOpen(true)
  }

  const handleClear = () => {
    setQuery('')
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8892b0]" size={16} />
        <input
          value={query}
          onChange={handleChange}
          placeholder="請輸入股票代號"
          className="pl-9 pr-9 h-9 w-80 rounded-md bg-[#2a3050] border border-[#4a5490] text-white placeholder:text-[#6b7bb0] focus:outline-none focus:border-[#2962ff] text-xl"
        />
        {query && (
          <XCircle 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8892b0] cursor-pointer hover:text-white"
            size={16}
            onClick={handleClear}
          />
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-11 left-0 w-80 bg-[#1e2130] border border-[#2a2e43] rounded-lg overflow-hidden z-50">
          {results.map((stock) => (
            <div
              key={stock.symbol}
              onClick={() => handleSelect(stock.symbol)}
              className="flex items-center justify-between px-4 py-3 hover:bg-[#2a2e43] cursor-pointer"
            >
              <span className="text-white font-bold text-xl">{stock.symbol}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}