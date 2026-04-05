"use client"

import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { Button } from "@/components/ui/button"
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
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="text-[#8892b0] hover:text-white hover:bg-[#2a2e43] gap-2"
    >
      <LogOut size={16} />
      登出
    </Button>
  )
}