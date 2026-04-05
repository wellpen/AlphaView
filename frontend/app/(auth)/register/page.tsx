"use client"

import Link from "next/link"
import { useRegister } from "@/hooks/useRegister"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  const { email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, error, loading, handleRegister } = useRegister()

  return (
    <main className="flex h-screen items-center justify-center bg-[#131722]">
      <Card className="w-96 bg-[#1e2130] border-[#2a2e43]">
      
        <CardHeader>
          <CardTitle className="text-white text-2xl">
            註冊 <span className="text-[#2962ff]">AlphaView</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Input
            placeholder="電子郵件"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#2a3050] border-[#4a5490] text-white placeholder:text-[#6b7bb0]"
          />
          <Input
            placeholder="密碼"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#2a3050] border-[#4a5490] text-white placeholder:text-[#6b7bb0]"
          />
          <Input
            placeholder="確認密碼"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRegister()}
            className="bg-[#2a3050] border-[#4a5490] text-white placeholder:text-[#6b7bb0]"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-[#2962ff] hover:bg-[#1a4fd6] text-white"
          >
            {loading ? "註冊中..." : "註冊"}
          </Button>
          <p className="text-center text-sm text-[#8892b0]">
            已有帳號？{" "}
            <Link href="/login" className="text-[#2962ff] hover:underline">
              登入
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}