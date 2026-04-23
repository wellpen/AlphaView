'use client'

import { use } from 'react'

export default function StockPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = use(params)

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">{symbol}</h1>
    </div>
  )
}