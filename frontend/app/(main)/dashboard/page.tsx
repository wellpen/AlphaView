// "use client"
// import { Search } from "lucide-react"
// import { Input } from "@/components/ui/input"

// const indices = [
//   { name: "S&P 500", value: "5,234.18", change: "+1.2%", up: true },
//   { name: "NASDAQ", value: "16,384.47", change: "+0.8%", up: true },
//   { name: "DOW JONES", value: "39,127.14", change: "-0.3%", up: false },
// ]

// const trendingStocks = [
//   { symbol: "AAPL", name: "Apple Inc.", price: "$182.5", change: "+1.2%", up: true },
//   { symbol: "TSLA", name: "Tesla Inc.", price: "$245.3", change: "-0.8%", up: false },
//   { symbol: "NVDA", name: "NVIDIA Corp.", price: "$875.2", change: "+2.3%", up: true },
// ]

// export default function DashboardPage() {
//   return (
//     <div className="flex flex-col gap-8">

//       {/* 大盤指數 */}
//       <div>
//         <h2 className="text-xl font-bold text-[#8892b0] uppercase tracking-widest mb-3">大盤指數</h2>
//         <div className="grid grid-cols-3 gap-4">
//           {indices.map((index) => (
//             <div key={index.name} className="bg-[#1e2130] border border-[#2a2e43] rounded-xl p-4">
//               <p className="text-xl text-[#8892b0] mb-1">{index.name}</p>
//               <p className="text-xl font-bold text-white">{index.value}</p>
//               <p className={`text-xl font-medium mt-1 ${index.up ? "text-[#00C805]" : "text-red-500"}`}>
//                 {index.change}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 熱門股票 */}
//       <div>
//         <h2 className="text-xl font-bold text-[#8892b0] uppercase tracking-widest mb-3">熱門股票</h2>
//         <div className="grid grid-cols-3 gap-4">
//           {trendingStocks.map((stock) => (
//             <div key={stock.symbol} className="bg-[#1e2130] border border-[#2a2e43] rounded-xl p-4 cursor-pointer  hover:border-[#2962ff] transition-all">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-white font-bold">{stock.symbol}</p>
//                 </div>
//                 <p className={`text-sm font-medium ${stock.up ? "text-[#00C805]" : "text-red-500"}`}>
//                   {stock.change}
//                 </p>
//               </div>
//               <p className="text-xl font-bold text-white mt-2">{stock.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   )
// }

"use client"

import { useEffect, useRef } from "react"

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
      largeChartUrl: "",
    })

    container.current.appendChild(script)
  }, [symbol])

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height, width: "100%" }} />
  )
}

const indices = [
  { name: "S&P 500", symbol: "FOREXCOM:SPXUSD" },
  { name: "NASDAQ", symbol: "FOREXCOM:NSXUSD" },
  { name: "道瓊", symbol: "FOREXCOM:DJI" },
  { name: "黃金", symbol: "OANDA:XAUUSD" },
  { name: "原油", symbol: "OANDA:WTICOUSD" },
  { name: "BTC/USD", symbol: "BITSTAMP:BTCUSD" },
]

export default function DashboardPage() {
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
        <div className="grid grid-cols-3 gap-4">
          {[
            { symbol: "AAPL", price: "$182.5", change: "+1.2%", up: true },
            { symbol: "TSLA", price: "$245.3", change: "-0.8%", up: false },
            { symbol: "NVDA", price: "$875.2", change: "+2.3%", up: true },
          ].map((stock) => (
            <div key={stock.symbol} className="bg-[#1e2130] border border-[#2a2e43] rounded-xl p-4 cursor-pointer hover:border-[#2962ff] transition-all">
              <div className="flex justify-between items-start">
                <p className="text-white font-bold">{stock.symbol}</p>
                <p className={`text-sm font-medium ${stock.up ? "text-[#00C805]" : "text-red-500"}`}>{stock.change}</p>
              </div>
              <p className="text-xl font-bold text-white mt-2">{stock.price}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}