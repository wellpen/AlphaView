import { User} from "lucide-react"
import { getUser } from "@/lib/auth"
import LogoutButton from "@/components/layout/LogoutButton"

export default async function UserInfo() {
  const user = await getUser()

  return (
    <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-xl text-[#8892b0]">
          <User size={20} />
          <span>{user?.email ?? "未登入"}</span>
        </div>
        <LogoutButton />
      </div>
  )
}
