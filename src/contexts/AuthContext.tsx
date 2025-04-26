'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  name: string
  email: string
  hasCompletedQuiz: boolean
}

type AuthContextType = {
  user: User | null
  login: (userData: Omit<User, 'hasCompletedQuiz'>) => void
  logout: () => void
  completeQuiz: () => void
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  function login(userData: Omit<User, 'hasCompletedQuiz'>) {
    const existingUser = {
      ...userData,
      hasCompletedQuiz: false,
    }

    setUser(existingUser)

    if (!existingUser.hasCompletedQuiz) {
      router.push('/quiz')
    } else {
      router.push('/dashboard')
    }
  }

  function completeQuiz() {
    if (user) {
      const updatedUser = { ...user, hasCompletedQuiz: true }
      setUser(updatedUser)
      router.push('/dashboard') 
    }
  }

  function logout() {
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, completeQuiz }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
