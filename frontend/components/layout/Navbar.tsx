import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User,ChevronDown, Calculator } from "lucide-react"
import Link from "next/link"
import { getUser } from "@/lib/auth"
import LogoutButton from "@/components/layout/LogoutButton"

export default async function Navbar() {
  const user = await getUser()

  return (
    <div className="flex items-center justify-between px-8 py-4 border-b border-[#2a2e43] bg-[#161b2e]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-2xl text-[#8892b0] hover:text-white hover:bg-[#2a2e43] gap-2">
            工具
            <ChevronDown size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#1e2130] border-[#2a2e43] text-white w-48">
          <DropdownMenuItem asChild>
            <Link href="/tools/options-calculator" className="text-2xl flex items-center gap-2 cursor-pointer hover:bg-[#2a2e43]">
              <Calculator size={14} />
              期權複利計算機
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-[#8892b0]">
          <User size={16} />
          <span>{user?.email ?? "未登入"}</span>
        </div>
        <LogoutButton />
      </div>
    </div>
  )
}