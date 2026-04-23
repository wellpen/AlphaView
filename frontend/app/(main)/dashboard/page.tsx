"use client"

import { useEffect, useRef, useState } from "react"
import socket from "@/lib/socket"
import api from "@/lib/api"

function TradingViewWidget({ symbol, height = 300 }: { symbol: string; height?: number }) {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!container.current) return
    container.current.innerHTML = ""

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js"
    script.type = "text/javascript"
    script.async = true
    script.innerHTML = JSON.stringify({
      symbol,
      width: "100%",
      height,
      locale: "zh_TW",
      dateRange: "12M",
      colorTheme: "dark",
      isTransparent: true,
      autosize: false,
    })

    container.current.appendChild(script)
  }, [symbol,height])

  return <div className="tradingview-widget-container" ref={container} style={{ height, width: "100%" }} />
}

const indices = [
  { name: "S&P 500", symbol: "FOREXCOM:SPXUSD" },
  { name: "NASDAQ", symbol: "FOREXCOM:NSXUSD" },
  { name: "道瓊", symbol: "FOREXCOM:DJI" },
  { name: "黃金", symbol: "OANDA:XAUUSD" },
  { name: "原油", symbol: "OANDA:WTICOUSD" },
  { name: "BTC/USD", symbol: "BITSTAMP:BTCUSD" },
]

interface Stock {
  symbol: string
  price: number | null
  change: number | null
  changeAmount: number | null
  prevClose: number | null
}

interface QuoteResult {
  symbol: string
  price: number
  change: number
  prevClose: number
  changeAmount: number
}

const defaultStocks: Stock[] = [
  { symbol: "NVDA", price: null, change: null, changeAmount: null, prevClose: null },
  { symbol: "AAPL", price: null, change: null, changeAmount: null, prevClose: null },
  { symbol: "MSFT", price: null, change: null, changeAmount: null, prevClose: null },
  { symbol: "GOOGL", price: null, change: null, changeAmount: null, prevClose: null },
  { symbol: "AMZN", price: null, change: null, changeAmount: null, prevClose: null },
  { symbol: "TSM", price: null, change: null, changeAmount: null, prevClose: null },
  { symbol: "META", price: null, change: null, changeAmount: null, prevClose: null },
  { symbol: "TSLA", price: null, change: null, changeAmount: null, prevClose: null }
]

export default function DashboardPage() {
  const [stocks, setStocks] = useState(defaultStocks)

  useEffect(() => {
    api.get("/market/quote").then((res) => {
      setStocks((prev) =>
        prev.map((s) => {
          const found = res.data.find((q: QuoteResult) => q.symbol === s.symbol)
          return found ? { 
              ...s, 
              price: found.price, 
              change: found.change, 
              prevClose: found.prevClose,
              changeAmount: found.changeAmount  // 加這個
            } : s
        })
      )
    })
  }, [])


  useEffect(() => {  
    socket.on("price", (data: { symbol: string; price: number }) => {
      setStocks((prev) =>
        prev.map((s) => {
          if (s.symbol !== data.symbol) return s
          const change = s.prevClose ? (data.price - s.prevClose) / s.prevClose * 100 : null        
          const changeAmount = s.prevClose ? data.price - s.prevClose : null
          return { ...s, price: data.price, change, changeAmount }
        })
      )
    })
    return () => { socket.off("price") }
  }, [])

  return (
    <div className="flex flex-col gap-6">

      {/* 大盤走勢圖 */}
      <div>
        <h2 className="text-xl font-bold text-[#8892b0] uppercase tracking-widest mb-3">大盤走勢</h2>
        <div className="grid grid-cols-3 gap-4">
          {indices.map((index) => (
            <div key={index.symbol} className="bg-[#1e2130] border border-[#2a2e43] rounded-xl p-4">
              <p className="text-[#8892b0] mb-2">{index.name}</p>
              <TradingViewWidget symbol={index.symbol} height={280} />
            </div>
          ))}
        </div>
      </div>

      {/* 熱門股票 */}
      <div>
        <h2 className="text-xl font-bold text-[#8892b0] uppercase tracking-widest mb-3">熱門股票</h2>
        <div className="grid grid-cols-8 gap-4">
          {stocks.map((stock) => (
            <div key={stock.symbol} className="text-xl bg-[#1e2130] border border-[#2a2e43] rounded-xl p-4 cursor-pointer hover:border-[#2962ff] transition-all">
              <p className="text-white font-bold">{stock.symbol}</p>            
              <p className="text-xl font-bold text-white mt-2">{stock.price ? `$${stock.price.toFixed(2)}` : "載入中..."}</p>
              {stock.change != null && stock.changeAmount != null && (
                <p key={`${stock.symbol}-${stock.price}`} className={`text-base font-bold mt-1 rounded inline-block px-1 
                  ${stock.change >= 0 ? "text-green-400" : "text-red-400"} 
                  ${stock.change >= 0 ? 'flash-up' : 'flash-down'}`}>
                  {stock.changeAmount >= 0 ? "+" : ""}{stock.changeAmount.toFixed(2)} &nbsp; {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)}%
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}