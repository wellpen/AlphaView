"use client"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const indices = [
  { name: "S&P 500", value: "5,234.18", change: "+1.2%", up: true },
  { name: "NASDAQ", value: "16,384.47", change: "+0.8%", up: true },
  { name: "DOW JONES", value: "39,127.14", change: "-0.3%", up: false },
]

const trendingStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: "$182.5", change: "+1.2%", up: true },
  { symbol: "TSLA", name: "Tesla Inc.", price: "$245.3", change: "-0.8%", up: false },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: "$875.2", change: "+2.3%", up: true },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">

      {/* 大盤指數 */}
      <div>
        <h2 className="text-xl font-bold text-[#8892b0] uppercase tracking-widest mb-3">大盤指數</h2>
        <div className="grid grid-cols-3 gap-4">
          {indices.map((index) => (
            <div key={index.name} className="bg-[#1e2130] border border-[#2a2e43] rounded-xl p-4">
              <p className="text-xl text-[#8892b0] mb-1">{index.name}</p>
              <p className="text-xl font-bold text-white">{index.value}</p>
              <p className={`text-xl font-medium mt-1 ${index.up ? "text-[#00C805]" : "text-red-500"}`}>
                {index.change}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 熱門股票 */}
      <div>
        <h2 className="text-xl font-bold text-[#8892b0] uppercase tracking-widest mb-3">熱門股票</h2>
        <div className="grid grid-cols-3 gap-4">
          {trendingStocks.map((stock) => (
            <div key={stock.symbol} className="bg-[#1e2130] border border-[#2a2e43] rounded-xl p-4 cursor-pointer  hover:border-[#2962ff] transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-bold">{stock.symbol}</p>
                </div>
                <p className={`text-sm font-medium ${stock.up ? "text-[#00C805]" : "text-red-500"}`}>
                  {stock.change}
                </p>
              </div>
              <p className="text-xl font-bold text-white mt-2">{stock.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 搜尋框 */}
      <div>
        <h2 className="text-2xl text-[#8892b0] uppercase tracking-widest mb-3">查詢個股</h2>
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8892b0]" size={16} />
          <Input
            placeholder="請輸入股票代號"
            className="pl-9 h-12 text-base bg-[#2a3050] border-[#4a5490] text-white placeholder:text-[#6b7bb0] focus:border-[#2962ff]"
          />
        </div>
      </div>

    </div>
  )
}