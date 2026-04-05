"use client"

import { useLogin } from "@/hooks/useLogin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function LoginPage() {

  const { email, setEmail, password, setPassword, error, loading, handleLogin } = useLogin()

  return (
    <main className="flex h-screen items-center justify-center bg-[#131722]">
      <Card className="w-96 bg-[#1e2130] border-[#2a2e43]">
        
        <CardHeader>
          <CardTitle className="text-white text-2xl">
            登入 <span className="text-[#2962ff]">AlphaView</span>
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
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="bg-[#2a3050] border-[#4a5490] text-white placeholder:text-[#6b7bb0]"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#2962ff] hover:bg-[#1a4fd6] text-white"
          >
            {loading ? "登入中..." : "登入"}
          </Button>
          <p className="text-center text-sm text-[#8892b0]">
            還沒有帳號？{" "}
            <Link href="/register" className="text-[#2962ff] hover:underline">
              註冊
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}