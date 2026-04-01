import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>註冊 AlphaView</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input placeholder="電子郵件" type="email" />
          <Input placeholder="密碼" type="password" />
          <Input placeholder="確認密碼" type="password" />
          <Button className="w-full">註冊</Button>
        </CardContent>
      </Card>
    </main>
  )
}

