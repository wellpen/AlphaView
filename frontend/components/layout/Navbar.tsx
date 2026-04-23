import SearchBar from "@/components/stock/SearchBar"
import ToolsDropdown from "@/components/layout/ToolsDropdown"
import UserInfo from "@/components/layout/UserInfo"

export default async function Navbar() {
  

  return (
    <div className="flex items-center justify-between px-8 py-4 border-b border-[#2a2e43] bg-[#161b2e]">

      <div className="flex items-center gap-4">
        <SearchBar /> 
        <ToolsDropdown/>      
      </div>
      <UserInfo/> 
      
    </div>
  )
}