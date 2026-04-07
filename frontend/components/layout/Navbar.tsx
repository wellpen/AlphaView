// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { User,ChevronDown, Calculator } from "lucide-react"
// import Link from "next/link"
// import { getUser } from "@/lib/auth"
// import LogoutButton from "@/components/layout/LogoutButton"

// export default async function Navbar() {
//   const user = await getUser()

//   return (
//     <div className="flex items-center justify-between px-8 py-4 border-b border-[#2a2e43] bg-[#161b2e]">
      
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="text-2xl text-[#8892b0] hover:text-white hover:bg-[#2a2e43] gap-2">
//             工具
//             <ChevronDown size={14} />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="bg-[#1e2130] border-[#2a2e43] text-white w-48">
//           <DropdownMenuItem asChild>
//             <Link href="/tools/options-calculator" className="text-2xl flex items-center gap-2 cursor-pointer hover:bg-[#2a2e43]">
//               <Calculator size={14} />
//               期權複利計算機
//             </Link>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <div className="flex items-center gap-6">
//         <div className="flex items-center gap-2 text-xl text-[#8892b0]">
//           <User size={20} />
//           <span>{user?.email ?? "未登入"}</span>
//         </div>
//         <LogoutButton />
//       </div>
//     </div>
//   )
// }

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, ChevronDown, Calculator, Search } from "lucide-react"
import Link from "next/link"
import { getUser } from "@/lib/auth"
import LogoutButton from "@/components/layout/LogoutButton"

export default async function Navbar() {
  const user = await getUser()

  return (
    <div className="flex items-center justify-between px-8 py-4 border-b border-[#2a2e43] bg-[#161b2e]">

      <div className="flex items-center gap-4">
        {/* 搜尋框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8892b0]" size={16} />
          <input
            placeholder="請輸入股票代號"
            className="pl-9 h-9 w-80 rounded-md bg-[#2a3050] border border-[#4a5490] text-white placeholder:text-[#6b7bb0] focus:outline-none focus:border-[#2962ff] text-xl"
          />
        </div>

        {/* 工具下拉 */}
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
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-xl text-[#8892b0]">
          <User size={20} />
          <span>{user?.email ?? "未登入"}</span>
        </div>
        <LogoutButton />
      </div>

    </div>
  )
}