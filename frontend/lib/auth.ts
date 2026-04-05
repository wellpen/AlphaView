import { cookies } from 'next/headers'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface User {
  sub: number
  email: string
}

export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (!token) return null

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Cookie: `token=${token.value}`,
      },
      cache: 'no-store',
    })

    if (!res.ok) return null

    return res.json()
  } catch {
    return null
  }
}