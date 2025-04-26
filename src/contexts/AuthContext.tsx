'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import type { AnsweredQuestion } from '@/types/quiz-answers'

type User = {
  id: string
  name: string
  email: string
  image: string
  hasCompletedQuiz: boolean
}

type AuthContextType = {
  user: User | null
  logout: () => void
  completeQuiz: (answeredQuestions: AnsweredQuestion[]) => void
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  function completeQuiz(answeredQuestions: AnsweredQuestion[]) {
    if (user) {
      const updatedUser = { ...user, hasCompletedQuiz: true }
      setUser(updatedUser)

      localStorage.setItem(`furioso-profile-${user.id}`, JSON.stringify(updatedUser))
      localStorage.setItem(`furioso-quiz-${user.id}`, JSON.stringify(answeredQuestions))

      router.push('/dashboard') 
    }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem(`furioso-profile-${user?.id}`)
    signOut({ callbackUrl: '/login' }) 
  }

  useEffect(() => {
    if (session?.user) {
      const userId = `${session.user.email!}-${session.user.name!}`
      const userData = localStorage.getItem(`furioso-profile-${userId}`)
      const parsedUserData = userData ? JSON.parse(userData) : null

      const userDataQuiz = localStorage.getItem(`furioso-quiz-${userId}`)

      if (userDataQuiz) {
        setUser(parsedUserData)
      } else {
        const newUserData = {
          id: userId,
          name: session.user.name || '',
          email: session.user.email || '',
          image: session.user.image || '',
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
