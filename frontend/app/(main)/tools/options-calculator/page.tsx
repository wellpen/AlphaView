"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { log } from "node:console"

export default function OptionsCalculatorPage() {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [years, setYears] = useState("")
  const [savedRate, setSavedRate] = useState(0)
  const [errors, setErrors] = useState({ principal: false, rate: false, years: false })
  const [rows, setRows] = useState<{ year: number; total: number; weekly: number; monthly: number; gained: number }[]>([])

  const handleCalculate = () => {
    const newErrors = {
      principal: !principal,
      rate: !rate,
      years: !years,
    }
    setErrors(newErrors)
    if (newErrors.principal || newErrors.rate || newErrors.years) return

    const p = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const y = parseInt(years)
    
    setSavedRate(r)

    const result = []
    let current = p
    for (let year = 1; year <= y; year++) {

      const next = current * (1 + r)
      const gained = next - current
      result.push({
        year,
        total: next,
        weekly: gained / 52,
        monthly: gained / 12,
        gained,  // 直接存進去
      })
      current = next
    }
    setRows(result)
  }

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const inputClass = (hasError: boolean) =>
    `h-12 !text-xl bg-[#2a3050] text-white placeholder:text-[#6b7bb0] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${hasError ? "border-red-500" : "border-[#4a5490]"}`

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">期權複利計算機</h1>
      </div>

      <div className="flex gap-4 max-w-2xl">        
      
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xl text-[#8892b0] uppercase tracking-widest">原始本金 ($)</label>
          <Input
            type="number"
            value={principal}
            onChange={(e) => { setPrincipal(e.target.value); setErrors(prev => ({ ...prev, principal: false })) }}
            className={inputClass(errors.principal)}
          />      
        </div>
        
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xl text-[#8892b0] uppercase tracking-widest">年化報酬率 (%)</label>
          <Input
            type="number"
            min={1}
            max={100}
            value={rate}
            onChange={(e) => { setRate(e.target.value); setErrors(prev => ({ ...prev, rate: false })) }}
            className={inputClass(errors.rate)}
          />
        </div>
        
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xl text-[#8892b0] uppercase tracking-widest">年數</label>
          <Input
            type="number"
            min={1}
            max={100}
            value={years}
            onChange={(e) => { setYears(e.target.value); setErrors(prev => ({ ...prev, years: false })) }}
            className={inputClass(errors.years)}
          />
        </div>
        
        <div className="flex flex-col gap-1 justify-end">          
          <Button
            onClick={handleCalculate}
            className="h-12 px-6 bg-[#2962ff] hover:bg-[#1a4fd6] text-white text-lg"
          >
            計算
          </Button>
        </div>

      </div>

      {rows.length > 0 && (
        <div className="rounded-3xls border border-[#2a2e43] overflow-hidden">
          <table className="w-full text-xl">
            <thead>
              <tr className="bg-[#1e2130] text-[#8892b0] uppercase text-xl tracking-widest">
                <th className="px-4 py-3 text-left w-24">年</th>
                <th className="px-4 py-3 text-right">總資產</th>
                <th className="px-4 py-3 text-right">年收益</th>
                <th className="px-4 py-3 text-right">週收益</th>
                <th className="px-4 py-3 text-right">月收益</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (                
                <tr key={row.year} className={`border-t border-[#2a2e43] ${i % 2 === 0 ? "bg-[#131722]" : "bg-[#161b2e]"}`}>
                  <td className="px-4 py-3 text-white w-24">{row.year} </td>
                  <td className="px-4 py-3 text-right text-white">${fmt(row.total)}</td>
                  <td className="px-4 py-3 text-right text-[#00C805]">${fmt(row.gained)}</td>
                  <td className="px-4 py-3 text-right text-[#8892b0]">${fmt(row.weekly)}</td>
                  <td className="px-4 py-3 text-right text-[#8892b0]">${fmt(row.monthly)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}