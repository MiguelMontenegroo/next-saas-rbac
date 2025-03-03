import { cookies } from 'next/headers'

export async function isAuthenticated() {
  const cookieStore = await cookies() // Chamando a função corretamente
  return !!cookieStore.get('token')?.value
}