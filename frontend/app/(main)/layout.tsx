import Sidebar from "@/components/layout/Sidebar"
import Navbar from "@/components/layout/Navbar"


export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-[#131722] text-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />        
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}