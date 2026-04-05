import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import api from "@/lib/api"

export function useRegister() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setError("")

    if (!email || !password || !confirmPassword) {
      setError("請填寫所有欄位")
      return
    }

    if (password !== confirmPassword) {
      setError("兩次密碼不一致")
      return
    }

    setLoading(true)

    try {
      await api.post("/auth/register", { email, password })
      router.replace("/login")
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "註冊失敗")
      } else {
        setError("伺服器連線失敗，請稍後再試")
      }
    } finally {
      setLoading(false)
    }
  }

  return { email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, error, loading, handleRegister }
}