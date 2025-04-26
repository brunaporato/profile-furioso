'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

type User = {
  id: string
  name: string
  email: string
  hasCompletedQuiz: boolean
}

type AuthContextType = {
  user: User | null
  logout: () => void
  completeQuiz: () => void
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  function completeQuiz() {
    if (user) {
      const updatedUser = { ...user, hasCompletedQuiz: true }
      setUser(updatedUser)

      localStorage.setItem(`furioso-profile-${user.id}`, JSON.stringify(updatedUser))

      router.push('/dashboard') 
    }
  }

  function logout() {
    setUser(null)
    router.push('/login')
  }

  useEffect(() => {
    if (session?.user) {
      const userId = `${session.user.email!}-${session.user.name!}`
      const userData = localStorage.getItem(`furioso-profile-${userId}`)
      const parsedUserData = userData ? JSON.parse(userData) : null

      if (parsedUserData) {
        setUser(parsedUserData)
        router.push('/dashboard')
      } else {
        const newUserData = {
          id: userId,
          name: session.user.name || '',
          email: session.user.email || '',
          hasCompletedQuiz: false,
        }

        setUser(newUserData)
        router.push('/quiz')
      }
    }
  }, [session, router])

  return (
    <AuthContext.Provider value={{ user, logout, completeQuiz }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
