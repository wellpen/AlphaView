import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import api from "@/lib/api"

export function useLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setError("")

    if (!email) {
        setError("請輸入電子郵件")
        return
    }

    if (!password) {
        setError("請輸入密碼")
        return
    }
    
    setLoading(true)

    try {
      await api.post("/auth/login", { email, password })
      router.replace("/dashboard")
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "登入失敗")
      } else {
        setError("登入失敗")
      }
    } finally {
      setLoading(false)
    }
  }

  return { email, setEmail, password, setPassword, error, loading, handleLogin }
}