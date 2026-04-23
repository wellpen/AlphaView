"use client"

import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout")
    } finally {
      router.replace("/login")
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-xl text-[#8892b0] hover:text-white cursor-pointer"
    >
    <LogOut size={20} />
    登出
    </button>
  )
}