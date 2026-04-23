import Link from "next/link"
import { Home , Star, Scale, CandlestickChart } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="flex flex-col h-screen w-60 bg-[#1e2130] text-white p-6 border-r border-[#2a2e43]">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="text-white">Alpha</span>
          <span className="text-[#2962ff]">View</span>
        </h1>
      </div>
      <nav className="flex flex-col gap-1">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-2xl text-[#8892b0] hover:text-white hover:bg-[#2a2e43] transition-all duration-200">
          <Home  size={16} />
          首頁
        </Link>
        <Link href="/watchlist" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-2xl text-[#8892b0] hover:text-white hover:bg-[#2a2e43] transition-all duration-200">
          <Star size={16} />
          自選股
        </Link>
        <Link href="/compare" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-2xl text-[#8892b0] hover:text-white hover:bg-[#2a2e43] transition-all duration-200">
          <Scale size={16} />
          比較
        </Link>
        <Link href="/technical-analysis" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-2xl text-[#8892b0] hover:text-white hover:bg-[#2a2e43] transition-all duration-200">
          <CandlestickChart size={16} />
          技術分析
        </Link>
      </nav>
    </div>
  )
}